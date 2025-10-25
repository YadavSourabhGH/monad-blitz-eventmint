// Image caching service for ticket images and metadata
class ImageCache {
  constructor() {
    this.storageKey = 'eventchain_images';
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
    this.maxCacheSize = 50; // Maximum number of cached images
  }

  // Generate default ticket images
  generateTicketImage(ticket) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 250;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 400, 250);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 250);
    
    // Add pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 20, 0);
      ctx.lineTo(i * 20 + 250, 250);
      ctx.stroke();
    }
    
    // Add ticket info
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(ticket.eventName || 'EventChain Ticket', 200, 60);
    
    ctx.font = '16px Arial';
    ctx.fillText(`Token ID: ${ticket.tokenId}`, 200, 90);
    ctx.fillText(`Venue: ${ticket.venue || 'TBA'}`, 200, 120);
    ctx.fillText(`Date: ${ticket.date || 'TBA'}`, 200, 150);
    ctx.fillText(`Price: ${ticket.price || '0'} ETH`, 200, 180);
    
    // Add blockchain verification
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#00ff88';
    ctx.fillText('✓ BLOCKCHAIN VERIFIED', 200, 210);
    
    return canvas.toDataURL('image/png');
  }

  // Cache image data
  cacheImage(tokenId, imageData, metadata = {}) {
    try {
      const cached = this.loadAllImages();
      
      // Remove oldest if cache is full
      const entries = Object.entries(cached);
      if (entries.length >= this.maxCacheSize) {
        // Sort by timestamp and remove oldest
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
        const toRemove = entries.slice(0, entries.length - this.maxCacheSize + 1);
        toRemove.forEach(([id]) => delete cached[id]);
      }
      
      cached[tokenId] = {
        imageData,
        metadata,
        timestamp: Date.now()
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(cached));
      console.log('✅ Image cached for token:', tokenId);
      return true;
    } catch (error) {
      console.error('❌ Failed to cache image:', error);
      return false;
    }
  }

  // Load cached image
  loadImage(tokenId) {
    try {
      const cached = this.loadAllImages();
      const imageCache = cached[tokenId];
      
      if (!imageCache) return null;
      
      // Check if expired
      const age = Date.now() - imageCache.timestamp;
      if (age > this.cacheExpiry) {
        delete cached[tokenId];
        localStorage.setItem(this.storageKey, JSON.stringify(cached));
        return null;
      }
      
      return imageCache.imageData;
    } catch (error) {
      console.error('❌ Failed to load cached image:', error);
      return null;
    }
  }

  // Load all cached images
  loadAllImages() {
    try {
      const cached = localStorage.getItem(this.storageKey);
      return cached ? JSON.parse(cached) : {};
    } catch (error) {
      console.error('❌ Failed to load image cache:', error);
      return {};
    }
  }

  // Get or generate ticket image
  getTicketImage(ticket) {
    // Try to load from cache first
    let imageData = this.loadImage(ticket.tokenId);
    
    if (!imageData) {
      // Generate new image
      console.log('🎨 Generating image for ticket:', ticket.tokenId);
      imageData = this.generateTicketImage(ticket);
      
      // Cache the generated image
      this.cacheImage(ticket.tokenId, imageData, {
        eventName: ticket.eventName,
        venue: ticket.venue,
        date: ticket.date
      });
    }
    
    return imageData;
  }

  // Clear image cache
  clearCache() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log('🧹 Image cache cleared');
      return true;
    } catch (error) {
      console.error('❌ Failed to clear image cache:', error);
      return false;
    }
  }

  // Get cache statistics
  getCacheStats() {
    try {
      const cached = this.loadAllImages();
      const entries = Object.entries(cached);
      
      let totalSize = 0;
      entries.forEach(([_, data]) => {
        totalSize += data.imageData.length;
      });
      
      return {
        count: entries.length,
        maxCount: this.maxCacheSize,
        totalSizeKB: Math.round(totalSize / 1024),
        oldestAge: entries.length > 0 ? 
          Math.min(...entries.map(([_, data]) => Date.now() - data.timestamp)) : 0
      };
    } catch (error) {
      return { count: 0, error: error.message };
    }
  }
}

export default new ImageCache();