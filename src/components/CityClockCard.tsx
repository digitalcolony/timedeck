import { Card, Text, Group, ActionIcon, Stack, Box, useMantineColorScheme } from '@mantine/core';
import { IconTrash, IconMapPin } from '@tabler/icons-react';
import type { CityData, TimeData } from '../types';

interface CityClockCardProps {
  city: CityData;
  timeData?: TimeData;
  onRemove: (cityId: string) => void;
}

export default function CityClockCard({ city, timeData, onRemove }: CityClockCardProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  const handleRemove = () => {
    onRemove(city.id);
  };

  return (
    <Card 
      shadow="md" 
      padding="xl" 
      radius="lg" 
      withBorder
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: isDark ? '1px solid #475569' : '1px solid #e2e8f0',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: isDark 
              ? '0 10px 25px rgba(0,0,0,0.3)'
              : '0 10px 25px rgba(0,0,0,0.1)',
          }
        }
      }}
    >
      {/* Subtle background pattern - only show in dark mode */}
      {isDark && (
        <Box
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #1e40af15 0%, #f9731615 100%)',
            borderRadius: '0 0 0 60px',
            zIndex: 0
          }}
        />
      )}
      
      <Group justify="space-between" align="flex-start" mb="md" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xs" style={{ flex: 1 }}>
          <Group gap="xs" align="center">
            <IconMapPin size={18} style={{ color: '#f97316' }} />
            <Text fw={700} size="lg" style={{ 
              color: isDark ? '#e2e8f0' : '#1e40af' 
            }}>
              {city.name}
            </Text>
          </Group>
          <Text size="sm" c="dimmed" fw={500} style={{ marginLeft: '26px' }}>
            {city.country}
          </Text>
        </Stack>
        
        <ActionIcon
          variant="subtle"
          color="red"
          size="sm"
          onClick={handleRemove}
          aria-label={`Remove ${city.name} from dashboard`}
          style={{
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#fee2e2',
              transform: 'scale(1.1)'
            }
          }}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>

      <Stack gap="sm" mt="lg" style={{ position: 'relative', zIndex: 1 }}>
        <Group justify="center" align="center" gap="sm">
          <Text 
            size="2.5rem" 
            fw={800} 
            ta="center"
            style={{
              color: isDark ? '#60a5fa' : '#64748b', // Reduced saturation for light mode
              letterSpacing: '-0.02em',
              fontFamily: 'Poppins, system-ui, sans-serif',
              textShadow: isDark 
                ? '0 2px 4px rgba(96, 165, 250, 0.3)' 
                : '0 2px 4px rgba(30, 64, 175, 0.3)'
            }}
          >
            {timeData?.time || '--:--'}
          </Text>
          {timeData?.timeOfDay && (
            <Text 
              size="xl" 
              style={{ 
                fontSize: '1.5rem',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                marginTop: '0.2rem' // Slight vertical alignment adjustment
              }}
              title={timeData.timeOfDay.label}
            >
              {timeData.timeOfDay.icon}
            </Text>
          )}
        </Group>
        
        <Text size="md" c="dimmed" ta="center" fw={500}>
          {timeData?.date || 'Loading...'}
        </Text>
        
        <Text 
          size="xs" 
          ta="center" 
          tt="uppercase" 
          fw={600}
          style={{ 
            color: '#16a34a',
            letterSpacing: '0.05em'
          }}
        >
          {timeData?.timezone || '---'}
        </Text>
      </Stack>
    </Card>
  );
}