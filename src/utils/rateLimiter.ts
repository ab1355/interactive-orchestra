
interface RateLimiterOptions {
  windowMs: number; // time window in milliseconds
  max: number;      // maximum requests in window
}

interface RateLimiterStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export class RateLimiter {
  private options: RateLimiterOptions;
  private store: RateLimiterStore = {};
  
  constructor(options: RateLimiterOptions) {
    this.options = {
      windowMs: 60 * 1000, // 1 minute default
      max: 100,            // 100 requests per window default
      ...options
    };
    
    // Clean up expired entries periodically
    setInterval(() => this.cleanup(), this.options.windowMs);
  }
  
  consume(key: string, points: number = 1): boolean {
    const now = Date.now();
    
    // Initialize or reset if expired
    if (!this.store[key] || this.store[key].resetTime < now) {
      this.store[key] = {
        count: 0,
        resetTime: now + this.options.windowMs
      };
    }
    
    // Check if would exceed limit
    if (this.store[key].count + points > this.options.max) {
      return false; // Rate limited
    }
    
    // Update counter
    this.store[key].count += points;
    return true; // Not rate limited
  }
  
  private cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }
}

// Export a singleton instance with default settings
export const globalRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
