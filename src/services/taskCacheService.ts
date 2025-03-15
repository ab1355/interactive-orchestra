
import { Task } from '@/types/flow';

// Simple in-memory cache implementation
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface Cache {
  [key: string]: CacheItem<any>;
}

// Configurable cache settings
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes default TTL
const cache: Cache = {};

/**
 * Get item from cache
 * @param key Cache key
 * @returns The cached data or null if not found/expired
 */
export function getCachedItem<T>(key: string): T | null {
  const item = cache[key];
  
  // Check if item exists and is not expired
  if (item && item.expiresAt > Date.now()) {
    console.log(`Cache hit for key: ${key}`);
    return item.data;
  }
  
  // If expired, remove it
  if (item) {
    console.log(`Cache expired for key: ${key}`);
    delete cache[key];
  }
  
  return null;
}

/**
 * Store item in cache
 * @param key Cache key
 * @param data Data to cache
 * @param ttl Time to live in milliseconds (optional)
 */
export function setCacheItem<T>(key: string, data: T, ttl: number = CACHE_DURATION_MS): void {
  console.log(`Caching data for key: ${key}`);
  const now = Date.now();
  cache[key] = {
    data,
    timestamp: now,
    expiresAt: now + ttl
  };
}

/**
 * Remove item from cache
 * @param key Cache key
 */
export function invalidateCache(key: string): void {
  console.log(`Invalidating cache for key: ${key}`);
  delete cache[key];
}

/**
 * Invalidate all cached items that match a prefix
 * @param prefix The prefix to match
 */
export function invalidateCacheByPrefix(prefix: string): void {
  console.log(`Invalidating cache items with prefix: ${prefix}`);
  Object.keys(cache).forEach(key => {
    if (key.startsWith(prefix)) {
      delete cache[key];
    }
  });
}

/**
 * Task-specific cache helpers
 */

// Generate a cache key for tasks by project
export function getTaskCacheKey(projectId: string): string {
  return `tasks_${projectId}`;
}

// Cache tasks for a specific project
export function cacheProjectTasks(projectId: string, tasks: Task[]): void {
  setCacheItem(getTaskCacheKey(projectId), tasks);
}

// Get cached tasks for a specific project
export function getCachedProjectTasks(projectId: string): Task[] | null {
  return getCachedItem<Task[]>(getTaskCacheKey(projectId));
}

// Invalidate cached tasks for a specific project
export function invalidateProjectTasksCache(projectId: string): void {
  invalidateCache(getTaskCacheKey(projectId));
}
