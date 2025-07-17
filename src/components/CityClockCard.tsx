import { Card, Text, Group, ActionIcon, Stack } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import type { CityData, TimeData } from '../types';

interface CityClockCardProps {
  city: CityData;
  timeData?: TimeData;
  onRemove: (cityId: string) => void;
}

export default function CityClockCard({ city, timeData, onRemove }: CityClockCardProps) {
  const handleRemove = () => {
    onRemove(city.id);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="flex-start" mb="xs">
        <Stack gap="xs" style={{ flex: 1 }}>
          <Text fw={600} size="lg">
            {city.name}
          </Text>
          <Text size="sm" c="dimmed">
            {city.country}
          </Text>
        </Stack>
        
        <ActionIcon
          variant="subtle"
          color="red"
          size="sm"
          onClick={handleRemove}
          aria-label={`Remove ${city.name} from dashboard`}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>

      <Stack gap="xs" mt="md">
        <Text size="xl" fw={700} ta="center">
          {timeData?.time || '--:--'}
        </Text>
        
        <Text size="sm" c="dimmed" ta="center">
          {timeData?.date || 'Loading...'}
        </Text>
        
        <Text size="xs" c="dimmed" ta="center" tt="uppercase">
          {timeData?.timezone || '---'}
        </Text>
      </Stack>
    </Card>
  );
}