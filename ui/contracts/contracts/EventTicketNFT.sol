// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EventTicketNFT
 * @dev NFT contract for event tickets on Monad blockchain
 * Each ticket is a unique NFT that can be purchased, transferred, and verified
 */
contract EventTicketNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    
    // Event structure
    struct Event {
        string name;
        string description;
        uint256 date;
        string location;
        uint256 ticketPrice; // Price in MON (wei)
        uint256 totalTickets;
        uint256 ticketsSold;
        address organizer;
        bool isActive;
        string imageUrl;
    }
    
    // Ticket structure
    struct Ticket {
        uint256 eventId;
        uint256 purchasePrice;
        uint256 purchaseDate;
        bool isUsed;
        bool isResellable;
    }
    
    // Mappings
    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => uint256[]) public eventTickets; // eventId => ticketIds
    mapping(address => uint256[]) public userTickets; // user => ticketIds
    
    uint256 public eventCounter;
    uint256 public platformFeePercentage = 250; // 2.5% (basis points)
    address public platformWallet;
    
    // Events
    event EventCreated(uint256 indexed eventId, string name, address organizer, uint256 ticketPrice);
    event TicketMinted(uint256 indexed ticketId, uint256 indexed eventId, address buyer, uint256 price);
    event TicketTransferred(uint256 indexed ticketId, address from, address to, uint256 price);
    event TicketVerified(uint256 indexed ticketId, uint256 indexed eventId, address owner);
    event TicketUsed(uint256 indexed ticketId, uint256 indexed eventId);
    
    constructor() ERC721("EventMint Ticket", "EMTKT") Ownable(msg.sender) {
        platformWallet = msg.sender;
    }
    
    /**
     * @dev Create a new event
     */
    function createEvent(
        string memory name,
        string memory description,
        uint256 date,
        string memory location,
        uint256 ticketPrice,
        uint256 totalTickets,
        string memory imageUrl
    ) external returns (uint256) {
        eventCounter++;
        
        events[eventCounter] = Event({
            name: name,
            description: description,
            date: date,
            location: location,
            ticketPrice: ticketPrice,
            totalTickets: totalTickets,
            ticketsSold: 0,
            organizer: msg.sender,
            isActive: true,
            imageUrl: imageUrl
        });
        
        emit EventCreated(eventCounter, name, msg.sender, ticketPrice);
        return eventCounter;
    }
    
    /**
     * @dev Purchase a ticket (mint NFT)
     */
    function purchaseTicket(uint256 eventId, string memory tokenURI) external payable returns (uint256) {
        Event storage eventData = events[eventId];
        require(eventData.isActive, "Event is not active");
        require(eventData.ticketsSold < eventData.totalTickets, "Event is sold out");
        require(msg.value >= eventData.ticketPrice, "Insufficient payment");
        
        // Mint NFT
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        // Create ticket record
        tickets[tokenId] = Ticket({
            eventId: eventId,
            purchasePrice: msg.value,
            purchaseDate: block.timestamp,
            isUsed: false,
            isResellable: true
        });
        
        // Update mappings
        eventTickets[eventId].push(tokenId);
        userTickets[msg.sender].push(tokenId);
        eventData.ticketsSold++;
        
        // Handle payments
        uint256 platformFee = (msg.value * platformFeePercentage) / 10000;
        uint256 organizerAmount = msg.value - platformFee;
        
        payable(platformWallet).transfer(platformFee);
        payable(eventData.organizer).transfer(organizerAmount);
        
        emit TicketMinted(tokenId, eventId, msg.sender, msg.value);
        return tokenId;
    }
    
    /**
     * @dev Resell a ticket
     */
    function resellTicket(uint256 tokenId, address buyer) external payable {
        require(ownerOf(tokenId) == msg.sender, "Not ticket owner");
        Ticket storage ticket = tickets[tokenId];
        require(ticket.isResellable, "Ticket is not resellable");
        require(!ticket.isUsed, "Ticket already used");
        
        Event storage eventData = events[ticket.eventId];
        require(block.timestamp < eventData.date, "Event has passed");
        
        // Transfer NFT
        _transfer(msg.sender, buyer, tokenId);
        
        // Handle payment
        uint256 platformFee = (msg.value * platformFeePercentage) / 10000;
        uint256 sellerAmount = msg.value - platformFee;
        
        payable(platformWallet).transfer(platformFee);
        payable(msg.sender).transfer(sellerAmount);
        
        // Update user tickets
        userTickets[buyer].push(tokenId);
        
        emit TicketTransferred(tokenId, msg.sender, buyer, msg.value);
    }
    
    /**
     * @dev Verify ticket ownership (for gate scanning)
     */
    function verifyTicket(uint256 tokenId) external view returns (
        bool isValid,
        address owner,
        uint256 eventId,
        bool isUsed
    ) {
        require(_ownerOf(tokenId) != address(0), "Ticket does not exist");
        
        Ticket memory ticket = tickets[tokenId];
        address ticketOwner = ownerOf(tokenId);
        
        return (
            !ticket.isUsed,
            ticketOwner,
            ticket.eventId,
            ticket.isUsed
        );
    }
    
    /**
     * @dev Mark ticket as used (called at event gate)
     */
    function useTicket(uint256 tokenId) external {
        Ticket storage ticket = tickets[tokenId];
        Event storage eventData = events[ticket.eventId];
        
        require(msg.sender == eventData.organizer, "Only organizer can mark ticket as used");
        require(!ticket.isUsed, "Ticket already used");
        
        ticket.isUsed = true;
        emit TicketUsed(tokenId, ticket.eventId);
    }
    
    /**
     * @dev Get all tickets for an event
     */
    function getEventTickets(uint256 eventId) external view returns (uint256[] memory) {
        return eventTickets[eventId];
    }
    
    /**
     * @dev Get all tickets owned by a user
     */
    function getUserTickets(address user) external view returns (uint256[] memory) {
        return userTickets[user];
    }
    
    /**
     * @dev Get event details
     */
    function getEvent(uint256 eventId) external view returns (Event memory) {
        return events[eventId];
    }
    
    /**
     * @dev Get ticket details
     */
    function getTicket(uint256 tokenId) external view returns (Ticket memory) {
        return tickets[tokenId];
    }
    
    /**
     * @dev Update platform fee (only owner)
     */
    function setPlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        platformFeePercentage = newFee;
    }
    
    /**
     * @dev Update platform wallet (only owner)
     */
    function setPlatformWallet(address newWallet) external onlyOwner {
        platformWallet = newWallet;
    }
    
    /**
     * @dev Deactivate an event (only organizer)
     */
    function deactivateEvent(uint256 eventId) external {
        Event storage eventData = events[eventId];
        require(msg.sender == eventData.organizer, "Only organizer can deactivate");
        eventData.isActive = false;
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
