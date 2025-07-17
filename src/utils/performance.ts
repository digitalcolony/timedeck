/**
 * Performance logging utilities for tracking page load times
 */
import React from 'react';

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
}

class PerformanceLogger {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private pageLoadStart: number;

  constructor() {
    // Only initialize in browser environment
    if (typeof window !== 'undefined' && typeof performance !== 'undefined') {
      this.pageLoadStart = performance.now();
      
      // Log initial page load metrics
      this.logPageLoadMetrics();
    } else {
      this.pageLoadStart = 0;
    }
  }

  /**
   * Start timing a specific operation
   */
  startTimer(name: string): void {
    if (typeof performance === 'undefined') return;
    
    this.metrics.set(name, {
      name,
      startTime: performance.now()
    });
    console.log(`🚀 [Performance] Started: ${name}`);
  }

  /**
   * End timing a specific operation
   */
  endTimer(name: string): number | null {
    if (typeof performance === 'undefined') return null;
    
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`⚠️ [Performance] Timer '${name}' was not started`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - metric.startTime;
    
    metric.endTime = endTime;
    metric.duration = duration;

    console.log(`✅ [Performance] Completed: ${name} - ${duration.toFixed(2)}ms`);
    return duration;
  }

  /**
   * Log a one-time measurement
   */
  logMeasurement(name: string, duration: number): void {
    console.log(`📊 [Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  /**
   * Log page load metrics using Navigation Timing API
   */
  private logPageLoadMetrics(): void {
    if (typeof window === 'undefined' || typeof performance === 'undefined') return;
    
    // Wait for page to fully load before measuring
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          console.group('📈 [Performance] Page Load Metrics');
          console.log(`DNS Lookup: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`);
          console.log(`TCP Connection: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`);
          console.log(`Request: ${(navigation.responseStart - navigation.requestStart).toFixed(2)}ms`);
          console.log(`Response: ${(navigation.responseEnd - navigation.responseStart).toFixed(2)}ms`);
          console.log(`DOM Interactive: ${(navigation.domInteractive - navigation.fetchStart).toFixed(2)}ms`);
          console.log(`DOM Content Loaded: ${(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart).toFixed(2)}ms`);
          console.log(`Total Load Time: ${(navigation.loadEventEnd - navigation.fetchStart).toFixed(2)}ms`);
          console.groupEnd();
        }

        // Log time from script start to page load
        const totalTime = performance.now() - this.pageLoadStart;
        console.log(`🎯 [Performance] Time to Interactive: ${totalTime.toFixed(2)}ms`);
      }, 100);
    });
  }

  /**
   * Get all recorded metrics
   */
  getAllMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Log a summary of all metrics
   */
  logSummary(): void {
    const metrics = this.getAllMetrics().filter(m => m.duration);
    
    if (metrics.length === 0) {
      console.log('📊 [Performance] No completed metrics to display');
      return;
    }

    console.group('📊 [Performance] Summary');
    metrics
      .sort((a, b) => (b.duration || 0) - (a.duration || 0))
      .forEach(metric => {
        console.log(`${metric.name}: ${metric.duration?.toFixed(2)}ms`);
      });
    console.groupEnd();
  }
}

// Create a singleton instance
export const performanceLogger = new PerformanceLogger();

/**
 * Higher-order component to measure React component render time
 */
export function withPerformanceLogging<T extends object>(
  Component: React.ComponentType<T>,
  componentName: string
): React.ComponentType<T> {
  return function PerformanceWrappedComponent(props: T) {
    const renderStart = typeof performance !== 'undefined' ? performance.now() : 0;
    
    React.useEffect(() => {
      if (typeof performance !== 'undefined') {
        const renderEnd = performance.now();
        const renderTime = renderEnd - renderStart;
        performanceLogger.logMeasurement(`${componentName} Render`, renderTime);
      }
    });

    return React.createElement(Component, props);
  };
}

/**
 * Hook to measure component mount time
 */
export function usePerformanceLogging(componentName: string): void {
  React.useEffect(() => {
    if (typeof performance === 'undefined') return;
    
    const mountTime = performance.now();
    performanceLogger.logMeasurement(`${componentName} Mount`, mountTime);
    
    return () => {
      if (typeof performance !== 'undefined') {
        const unmountTime = performance.now();
        performanceLogger.logMeasurement(`${componentName} Unmount`, unmountTime - mountTime);
      }
    };
  }, [componentName]);
}