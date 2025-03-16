
import React from 'react';
import { dataCache } from './cacheUtils';

type MetricName = string;
type MetricValue = number;
type EventName = string;
type EventData = Record<string, any>;

interface PerformanceData {
  metrics: Map<MetricName, MetricValue[]>;
  errors: Error[];
  events: {name: EventName, data: EventData, timestamp: number}[];
}

class PerformanceMonitor {
  private data: PerformanceData = {
    metrics: new Map(),
    errors: [],
    events: []
  };
  
  private maxStoredMetrics = 100;
  private maxStoredErrors = 50;
  private maxStoredEvents = 100;
  
  // Track a metric with a name and value
  trackMetric(name: string, value: number): void {
    if (!this.data.metrics.has(name)) {
      this.data.metrics.set(name, []);
    }
    
    const metrics = this.data.metrics.get(name) || [];
    metrics.push(value);
    
    // Limit the number of stored metrics
    if (metrics.length > this.maxStoredMetrics) {
      metrics.shift();
    }
    
    console.debug(`[Performance] ${name}: ${value}`);
    
    // In a real app, we might batch these and send to a backend
    this.sendMetricsToBackend();
  }
  
  // Log an error with optional context
  logError(error: Error, context?: any): void {
    this.data.errors.push(error);
    
    // Limit the number of stored errors
    if (this.data.errors.length > this.maxStoredErrors) {
      this.data.errors.shift();
    }
    
    console.error('[Error]', error, context);
    
    // In a real app, we might send this to a logging service
    this.sendErrorToLoggingService(error, context);
  }
  
  // Track a named event with data
  trackEvent(name: string, data: Record<string, any> = {}): void {
    this.data.events.push({
      name,
      data,
      timestamp: Date.now()
    });
    
    // Limit the number of stored events
    if (this.data.events.length > this.maxStoredEvents) {
      this.data.events.shift();
    }
    
    console.debug(`[Event] ${name}`, data);
    
    // In a real app, we might batch these and send to analytics
    this.sendEventToAnalytics(name, data);
  }
  
  // Start timing an operation
  startTimer(operationName: string): () => void {
    const start = performance.now();
    
    // Return a function that stops the timer and records duration
    return () => {
      const duration = performance.now() - start;
      this.trackMetric(`${operationName}_duration`, duration);
      return duration;
    };
  }
  
  // Get performance report data
  getPerformanceReport(): PerformanceData {
    return {
      metrics: new Map(this.data.metrics),
      errors: [...this.data.errors],
      events: [...this.data.events]
    };
  }
  
  // Clear collected data
  clearData(): void {
    this.data.metrics.clear();
    this.data.errors = [];
    this.data.events = [];
  }
  
  // These would be implemented in a real application:
  private sendMetricsToBackend(): void {
    // In a real app, implement API call to send metrics
    // For now, just mock the functionality
  }
  
  private sendErrorToLoggingService(error: Error, context?: any): void {
    // In a real app, implement API call to send error to logging service
    // For now, just mock the functionality
  }
  
  private sendEventToAnalytics(name: string, data: Record<string, any>): void {
    // In a real app, implement API call to send event to analytics service
    // For now, just mock the functionality
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility function to measure component render performance
export function useRenderPerformance(componentName: string) {
  React.useEffect(() => {
    const endTimer = performanceMonitor.startTimer(`${componentName}_render`);
    
    return () => {
      endTimer();
    };
  }, [componentName]);
}
