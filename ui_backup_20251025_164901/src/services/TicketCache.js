// Local ticket caching system to reduce blockchain calls
class TicketCache {
  constructor() {
    this.storageKey = 'eventchain_tickets';
    this.metadataKey = 'eventchain_metadata';
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  // Save tickets to localStorage
  saveTickets(userAddress, tickets) {
    try {
      const cacheData = {
        userAddress: userAddress.toLowerCase(),
        tickets: tickets,
        timestamp: Date.now(),
        blockchainVerified: true
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(cacheData));
      console.log('✅ Tickets cached locally:', tickets.length);
      return true;
    } catch (error) {
      console.error('❌ Failed to cache tickets:', error);
      return false;
    }
  }

  // Load tickets from localStorage
  loadTickets(userAddress) {
    try {
      const cached = localStorage.getItem(this.storageKey);
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      
      // Check if cache is for the right user
      if (cacheData.userAddress !== userAddress.toLowerCase()) {
        console.log('🔄 Cache is for different user, clearing...');
        this.clearCache();
        return null;
      }

      // Check if cache is expired
      const age = Date.now() - cacheData.timestamp;
      if (age > this.cacheExpiry) {
        console.log('⏰ Cache expired, will refresh from blockchain');
        return null;
      }

      console.log('✅ Loaded tickets from cache:', cacheData.tickets.length);
      return cacheData.tickets;
    } catch (error) {
      console.error('❌ Failed to load cached tickets:', error);
      return null;
    }
  }

  // Save ticket metadata (images, descriptions, etc.)
  saveTicketMetadata(tokenId, metadata) {
    try {
      const existing = this.loadAllMetadata();
      existing[tokenId] = {
        ...metadata,
        timestamp: Date.now()
      };
      
      localStorage.setItem(this.metadataKey, JSON.stringify(existing));
      console.log('✅ Metadata cached for token:', tokenId);
      return true;
    } catch (error) {
      console.error('❌ Failed to cache metadata:', error);
      return false;
    }
  }

  // Load ticket metadata
  loadTicketMetadata(tokenId) {
    try {
      const allMetadata = this.loadAllMetadata();
      return allMetadata[tokenId] || null;
    } catch (error) {
      console.error('❌ Failed to load metadata:', error);
      return null;
    }
  }

  // Load all metadata
  loadAllMetadata() {
    try {
      const cached = localStorage.getItem(this.metadataKey);
      return cached ? JSON.parse(cached) : {};
    } catch (error) {
      console.error('❌ Failed to load all metadata:', error);
      return {};
    }
  }

  // Clear all cache
  clearCache() {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.metadataKey);
      console.log('🧹 Cache cleared');
      return true;
    } catch (error) {
      console.error('❌ Failed to clear cache:', error);
      return false;
    }
  }

  // Check if cache exists and is valid
  isCacheValid(userAddress) {
    try {
      const cached = localStorage.getItem(this.storageKey);
      if (!cached) return false;

      const cacheData = JSON.parse(cached);
      
      // Check user and expiry
      const isRightUser = cacheData.userAddress === userAddress.toLowerCase();
      const age = Date.now() - cacheData.timestamp;
      const isNotExpired = age <= this.cacheExpiry;
      
      return isRightUser && isNotExpired;
    } catch (error) {
      return false;
    }
  }

  // Get cache info for debugging
  getCacheInfo(userAddress) {
    try {
      const cached = localStorage.getItem(this.storageKey);
      if (!cached) return { exists: false };

      const cacheData = JSON.parse(cached);
      const age = Date.now() - cacheData.timestamp;
      
      return {
        exists: true,
        userAddress: cacheData.userAddress,
        ticketCount: cacheData.tickets?.length || 0,
        ageMinutes: Math.floor(age / 60000),
        isExpired: age > this.cacheExpiry,
        isRightUser: cacheData.userAddress === userAddress.toLowerCase()
      };
    } catch (error) {
      return { exists: false, error: error.message };
    }
  }
}

export default new TicketCache();