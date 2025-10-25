// IPFS Service for storing event and ticket metadata
// Using Pinata as IPFS gateway (free tier available)

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY || '';
const PINATA_SECRET_KEY = process.env.REACT_APP_PINATA_SECRET_KEY || '';
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

/**
 * Upload JSON metadata to IPFS via Pinata
 * @param {Object} metadata - The metadata object to upload
 * @returns {Promise<string>} - The IPFS hash
 */
export const uploadJSONToIPFS = async (metadata) => {
  try {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
      body: JSON.stringify({
        pinataContent: metadata,
        pinataMetadata: {
          name: metadata.name || 'EventChain Metadata',
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to upload to IPFS');
    }

    const data = await response.json();
    return data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

/**
 * Upload file to IPFS via Pinata
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The IPFS hash
 */
export const uploadFileToIPFS = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file to IPFS');
    }

    const data = await response.json();
    return data.IpfsHash;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
};

/**
 * Create and upload event metadata to IPFS
 * @param {Object} eventData - Event information
 * @returns {Promise<string>} - The IPFS URI
 */
export const createEventMetadata = async (eventData) => {
  const metadata = {
    name: eventData.name,
    description: eventData.description || `Event: ${eventData.name}`,
    location: eventData.location,
    date: eventData.date,
    image: eventData.imageUrl,
    attributes: [
      { trait_type: 'Location', value: eventData.location },
      { trait_type: 'Date', value: eventData.date },
      { trait_type: 'Ticket Price', value: eventData.ticketPrice },
      { trait_type: 'Total Tickets', value: eventData.totalTickets },
    ],
    external_url: 'https://eventchain.io',
  };

  const ipfsHash = await uploadJSONToIPFS(metadata);
  return `${PINATA_GATEWAY}${ipfsHash}`;
};

/**
 * Create and upload ticket metadata to IPFS
 * @param {Object} ticketData - Ticket information
 * @returns {Promise<string>} - The IPFS URI
 */
export const createTicketMetadata = async (ticketData) => {
  const metadata = {
    name: `${ticketData.eventName} - Ticket #${ticketData.tokenId}`,
    description: `NFT Ticket for ${ticketData.eventName}`,
    image: ticketData.eventImage,
    attributes: [
      { trait_type: 'Event Name', value: ticketData.eventName },
      { trait_type: 'Venue', value: ticketData.venue },
      { trait_type: 'Date', value: ticketData.date },
      { trait_type: 'Ticket Price', value: ticketData.price },
      { trait_type: 'Token ID', value: ticketData.tokenId },
      { trait_type: 'Seat', value: ticketData.seat || 'General Admission' },
    ],
    properties: {
      eventId: ticketData.eventId,
      tokenId: ticketData.tokenId,
      purchaseDate: new Date().toISOString(),
      qrCode: ticketData.qrCode,
    },
  };

  const ipfsHash = await uploadJSONToIPFS(metadata);
  return `${PINATA_GATEWAY}${ipfsHash}`;
};

/**
 * Retrieve metadata from IPFS
 * @param {string} uri - The IPFS URI or hash
 * @returns {Promise<Object>} - The metadata object
 */
export const getMetadataFromIPFS = async (uri) => {
  try {
    // Extract hash from URI if needed
    let hash = uri;
    if (uri.includes('ipfs://')) {
      hash = uri.replace('ipfs://', '');
    } else if (uri.includes('/ipfs/')) {
      hash = uri.split('/ipfs/')[1];
    }

    const url = `${PINATA_GATEWAY}${hash}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch metadata from IPFS');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw error;
  }
};

/**
 * Fallback: Store metadata locally (for development without IPFS)
 */
const localStorageKey = 'eventchain_ipfs_fallback';

export const storeMetadataLocally = (metadata) => {
  const stored = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  const hash = 'local_' + Date.now() + Math.random().toString(36).substring(7);
  stored[hash] = metadata;
  localStorage.setItem(localStorageKey, JSON.stringify(stored));
  return `local://${hash}`;
};

export const getLocalMetadata = (uri) => {
  const hash = uri.replace('local://', '');
  const stored = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  return stored[hash];
};

/**
 * Unified upload function with fallback
 */
export const uploadMetadata = async (metadata, useLocal = false) => {
  if (useLocal || !PINATA_API_KEY || !PINATA_SECRET_KEY) {
    console.warn('Using local storage fallback for IPFS');
    return storeMetadataLocally(metadata);
  }
  
  try {
    return await createEventMetadata(metadata);
  } catch (error) {
    console.warn('IPFS upload failed, using local storage:', error);
    return storeMetadataLocally(metadata);
  }
};
