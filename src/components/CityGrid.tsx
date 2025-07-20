import React from "react";
import { SimpleGrid, Container, Text, Stack, Button } from "@mantine/core";
import { IconWorldPin } from "@tabler/icons-react";
import { useDrag, useDrop } from "react-dnd";
import { useMultipleCurrentTimes } from "../hooks/useCurrentTime";
import CityClockCard from "./CityClockCard";

import type { CityData } from "../types";

const ITEM_TYPE = "CITY_CARD";

interface DragItem {
  id: string;
  index: number;
}

interface DraggableCityCardProps {
  city: CityData;
  index: number;
  timeData?: any;
  onRemove: (cityId: string) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableCityCard: React.FC<DraggableCityCardProps> = ({
  city,
  index,
  timeData,
  onRemove,
  moveCard,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: string | symbol | null }
  >({
    accept: ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: city.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity,
        cursor: "move",
        transform: isDragging ? "rotate(5deg) scale(1.05)" : "none",
        transition: "transform 0.2s ease",
      }}
      data-handler-id={handlerId}
    >
      <CityClockCard city={city} timeData={timeData} onRemove={onRemove} />
    </div>
  );
};

interface CityGridProps {
  cities: CityData[];
  onRemoveCity: (cityId: string) => void;
  onReorderCities: (reorderedCities: CityData[]) => boolean;
  onAddFirstCity?: () => void;
}

export default function CityGrid({
  cities,
  onRemoveCity,
  onReorderCities,
  onAddFirstCity,
}: CityGridProps) {
  // Use a single timer for all cities to improve performance
  // Memoize timezones to prevent unnecessary re-renders
  const timezones = React.useMemo(
    () => cities.map((city) => city.timezone),
    [cities]
  );
  const timeDataMap = useMultipleCurrentTimes(timezones);

  // Handle card reordering
  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedCity = cities[dragIndex];
      const newCities = [...cities];
      newCities.splice(dragIndex, 1);
      newCities.splice(hoverIndex, 0, draggedCity);
      onReorderCities(newCities);
    },
    [cities, onReorderCities]
  );

  // Show empty state when no cities are selected
  if (cities.length === 0) {
    return (
      <Container size="sm" py="xl">
        <Stack align="center" gap="lg">
          <IconWorldPin
            size={48}
            stroke={1.5}
            color="var(--mantine-color-dimmed)"
          />
          <Text size="lg" fw={500} ta="center">
            No cities selected
          </Text>
          <Text size="sm" c="dimmed" ta="center" maw={400}>
            Add cities from around the world to track time across different time
            zones. Use the search above to get started.
          </Text>
          {onAddFirstCity && (
            <Button variant="light" onClick={onAddFirstCity}>
              Add your first city
            </Button>
          )}
        </Stack>
      </Container>
    );
  }

  return (
    <SimpleGrid
      cols={{
        base: 1, // Mobile: 1 card per row
        sm: 2, // Tablet: 2 cards per row
        md: 3, // Desktop: 3 cards per row
        lg: 4, // Large desktop: 4 cards per row
      }}
      spacing={{
        base: "md",
        sm: "lg",
      }}
      verticalSpacing={{
        base: "md",
        sm: "lg",
      }}
    >
      {cities.map((city, index) => (
        <DraggableCityCard
          key={city.id}
          city={city}
          index={index}
          timeData={timeDataMap.get(city.timezone)}
          onRemove={onRemoveCity}
          moveCard={moveCard}
        />
      ))}
    </SimpleGrid>
  );
}
