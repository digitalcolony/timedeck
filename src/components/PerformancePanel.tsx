import React, { useState, useEffect } from 'react';
import { Card, Text, Stack, Button, Group, Badge, Collapse, useMantineColorScheme } from '@mantine/core';
import { IconChartBar, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { performanceLogger } from '../utils/performance';

export default function PerformancePanel() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);

  useEffect(() => {
    // Update metrics every 2 seconds
    const interval = setInterval(() => {
      setMetrics(performanceLogger.getAllMetrics());
    }, 2000);

    // Get page load time from Navigation Timing API
    const getPageLoadTime = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation && navigation.loadEventEnd > 0) {
        setPageLoadTime(navigation.loadEventEnd - navigation.fetchStart);
      }
    };

    // Check immediately and then after page load
    getPageLoadTime();
    window.addEventListener('load', () => {
      setTimeout(getPageLoadTime, 100);
    });

    return () => clearInterval(interval);
  }, []);

  const completedMetrics = metrics.filter(m => m.duration);
  const totalAppTime = completedMetrics.reduce((sum, m) => sum + (m.duration || 0), 0);

  return (
    <Card 
      shadow="sm" 
      padding="sm" 
      radius="md" 
      withBorder 
      style={{ 
        position: 'fixed', 
        bottom: 20, 
        right: 20, 
        width: 300,
        zIndex: 1000,
        backgroundColor: isDark 
          ? 'rgba(30, 41, 59, 0.95)' 
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: isDark ? '1px solid #475569' : '1px solid #e2e8f0'
      }}
    >
      <Group justify="space-between" mb="xs">
        <Group gap="xs">
          <IconChartBar size={16} />
          <Text size="sm" fw={600}>Performance</Text>
        </Group>
        <Button
          variant="subtle"
          size="xs"
          onClick={() => setIsOpen(!isOpen)}
          rightSection={isOpen ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        >
          {isOpen ? 'Hide' : 'Show'}
        </Button>
      </Group>

      <Collapse in={isOpen}>
        <Stack gap="xs">
          {/* Page Load Time */}
          {pageLoadTime && (
            <Group justify="space-between">
              <Text size="xs">Page Load:</Text>
              <Badge 
                color={pageLoadTime < 1000 ? 'green' : pageLoadTime < 3000 ? 'yellow' : 'red'} 
                size="sm"
              >
                {(pageLoadTime / 1000).toFixed(1)}s
              </Badge>
            </Group>
          )}

          {/* App Initialization Time */}
          {totalAppTime > 0 && (
            <Group justify="space-between">
              <Text size="xs">App Init:</Text>
              <Badge 
                color={totalAppTime < 100 ? 'green' : totalAppTime < 500 ? 'yellow' : 'red'} 
                size="sm"
              >
                {totalAppTime.toFixed(0)}ms
              </Badge>
            </Group>
          )}

          {/* Individual Metrics */}
          {completedMetrics.slice(0, 5).map((metric, index) => (
            <Group key={index} justify="space-between">
              <Text size="xs" truncate style={{ maxWidth: 150 }}>
                {metric.name}:
              </Text>
              <Badge 
                color={metric.duration < 50 ? 'green' : metric.duration < 200 ? 'yellow' : 'red'} 
                size="sm"
              >
                {metric.duration.toFixed(0)}ms
              </Badge>
            </Group>
          ))}

          {/* Performance Rating */}
          <Group justify="space-between" pt="xs" style={{ 
            borderTop: isDark ? '1px solid #475569' : '1px solid #eee' 
          }}>
            <Text size="xs" fw={600}>Rating:</Text>
            <Badge 
              color={
                pageLoadTime && pageLoadTime < 1000 && totalAppTime < 200 ? 'green' :
                pageLoadTime && pageLoadTime < 3000 && totalAppTime < 500 ? 'yellow' : 'red'
              }
              size="sm"
            >
              {pageLoadTime && pageLoadTime < 1000 && totalAppTime < 200 ? 'Excellent' :
               pageLoadTime && pageLoadTime < 3000 && totalAppTime < 500 ? 'Good' : 'Needs Work'}
            </Badge>
          </Group>
        </Stack>
      </Collapse>
    </Card>
  );
}