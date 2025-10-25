// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IEventChainContract.sol";
import "./IEventChainEventManagerContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EventChainEventManagerContract
 * @dev This contract manages the creation and organization of events. It allows event organizers
 *      to create events, mint tickets, and transfer event ownership. The contract is owned by an 
 *      owner who can set the address of the associated EventChainContract.
 */
contract EventChainEventManagerContract is Ownable, IEventChainEventManagerContract {

    uint256 private _eventIdCounter; // Counter to keep track of event IDs

    struct EventExtended {
        string name;
        string location;
        string date;
        uint256 ticketPrice;
        address organizer;
        string imageUrl;
        uint256 totalTickets;
        uint256 soldTickets;
        uint256 redeemedTickets;
    }

    mapping(uint256 => Event) private events; // Mapping from event ID to event details
    mapping(uint256 => EventExtended) private eventsExtended; // Extended event details
    mapping(uint256 => uint256[]) private eventTickets; // Mapping from event ID to ticket IDs
    address _eventChainContractAddress; // Address of the associated EventChainContract

    /**
     * @dev Initializes the contract by setting a `initialOwner`.
     * @param initialOwner The address of the initial owner of the contract.
     */
    constructor(address initialOwner, address eventChainContractAddress)
        Ownable(initialOwner)
    {
        _eventChainContractAddress = eventChainContractAddress;
    }

    /**
     * @dev Sets the address of the EventChainContract.
     * @param eventChainContractAddress The address of the EventChainContract.
     */
    function setEventChainAddress(address eventChainContractAddress) external onlyOwner() {
        _eventChainContractAddress = eventChainContractAddress;
    }

    /**
     * @dev Creates a new event.
     * @param name The name of the event.
     * @param location The location of the event.
     * @param date The date of the event.
     * @param ticketPrice The price of a ticket for the event.
     */
    function createEvent(string memory name, string memory location, string memory date, uint256 ticketPrice) public override {
        uint256 eventId = _eventIdCounter;
        _eventIdCounter += 1;
        events[eventId] = Event({
            name: name,
            location: location,
            date: date,
            ticketPrice: ticketPrice,
            organizer: msg.sender
        });
       
        emit EventCreated(eventId, name, location, date, ticketPrice, msg.sender);
    }

    /**
     * @dev Creates a new event with extended details including image and ticket quantity.
     * @param name The name of the event.
     * @param location The location of the event.
     * @param date The date of the event.
     * @param ticketPrice The price of a ticket for the event.
     * @param imageUrl The image URL for the event.
     * @param totalTickets The total number of tickets available.
     */
    function createEventExtended(
        string memory name, 
        string memory location, 
        string memory date, 
        uint256 ticketPrice,
        string memory imageUrl,
        uint256 totalTickets
    ) public {
        uint256 eventId = _eventIdCounter;
        _eventIdCounter += 1;
        
        events[eventId] = Event({
            name: name,
            location: location,
            date: date,
            ticketPrice: ticketPrice,
            organizer: msg.sender
        });

        eventsExtended[eventId] = EventExtended({
            name: name,
            location: location,
            date: date,
            ticketPrice: ticketPrice,
            organizer: msg.sender,
            imageUrl: imageUrl,
            totalTickets: totalTickets,
            soldTickets: 0,
            redeemedTickets: 0
        });
       
        emit EventCreated(eventId, name, location, date, ticketPrice, msg.sender);
    }

    /**
     * @dev Returns extended event details including sales statistics.
     * @param eventId The ID of the event.
     */
    function getEventExtended(uint256 eventId) public view returns (EventExtended memory) {
        require(eventId < _eventIdCounter, "Event does not exist");
        return eventsExtended[eventId];
    }

    /**
     * @dev Returns all ticket IDs for an event.
     * @param eventId The ID of the event.
     */
    function getEventTickets(uint256 eventId) public view returns (uint256[] memory) {
        require(eventId < _eventIdCounter, "Event does not exist");
        return eventTickets[eventId];
    }

    /**
     * @dev Returns the details of an event.
     * @param eventId The ID of the event.
     * @return The event details.
     */
    function getEventDetails(uint256 eventId) public view override returns (Event memory) {
        require(eventId < _eventIdCounter, "Event does not exist");
        return events[eventId];
    }

    /**
     * @dev Mints a ticket for an event.
     * @param eventId The ID of the event.
     * @param to The address of the recipient.
     * @param uri The URI of the ticket metadata.
     */
    function mintTicket(uint256 eventId, address to, string memory uri) public override {
        require(eventId < _eventIdCounter, "Event does not exist");
        require(events[eventId].organizer == msg.sender, "Only the event organizer can mint tickets");
        require(_eventChainContractAddress != address(0), "Event chain contract address is not set");
        require(address(this).balance == 0, "Cannot mint ticket with pending transactions");

        IEventChainContract eventChainContract = IEventChainContract(_eventChainContractAddress);
        eventChainContract.safeMint(to, uri, events[eventId].name, events[eventId].ticketPrice, block.timestamp + 1 weeks); // Ticket expires in 1 week
    }

    /**
     * @dev Mints a ticket and updates sold count for extended events.
     * @param eventId The ID of the event.
     * @param uri The URI of the ticket metadata.
     * @param tokenId The token ID being minted.
     */
    function mintTicketExtended(uint256 eventId, string memory uri, uint256 tokenId) public payable {
        require(eventId < _eventIdCounter, "Event does not exist");
        require(_eventChainContractAddress != address(0), "Event chain contract address is not set");
        
        EventExtended storage eventExt = eventsExtended[eventId];
        require(eventExt.soldTickets < eventExt.totalTickets, "All tickets sold");
        require(msg.value >= eventExt.ticketPrice, "Insufficient payment");

        IEventChainContract eventChainContract = IEventChainContract(_eventChainContractAddress);
        eventChainContract.safeMint(msg.sender, uri, eventExt.name, eventExt.ticketPrice, block.timestamp + 1 weeks);
        
        eventExt.soldTickets += 1;
        eventTickets[eventId].push(tokenId);

        // Transfer payment to organizer
        payable(eventExt.organizer).transfer(msg.value);
    }

    /**
     * @dev Increments redeemed ticket count for an event.
     * @param eventId The ID of the event.
     */
    function markTicketRedeemed(uint256 eventId) public {
        require(eventId < _eventIdCounter, "Event does not exist");
        EventExtended storage eventExt = eventsExtended[eventId];
        eventExt.redeemedTickets += 1;
    }

    /**
     * @dev Returns total number of events.
     */
    function getTotalEvents() public view returns (uint256) {
        return _eventIdCounter;
    }

    /**
     * @dev Transfers the ownership of an event.
     * @param eventId The ID of the event.
     * @param to The address of the new owner.
     */
    function transferEvent(uint256 eventId, address to) external onlyOwner {
        Event storage currentEvent = events[eventId];
        require(currentEvent.organizer == msg.sender, "Only the event organizer can transfer the event");

        currentEvent.organizer = to;
        emit EventTransferred(eventId, msg.sender, to);
    }
}