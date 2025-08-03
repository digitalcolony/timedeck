import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Select,
  Stack,
  Group,
  Text,
  Button,
  ScrollArea,
  useMantineColorScheme,
  Box,
  Divider,
} from "@mantine/core";
import { IconClock, IconCopy } from "@tabler/icons-react";
import type { CityData } from "../types";
import {
  parseTimeInput,
  getDayNightIcon,
  calculateHourDifference,
  calculateDayDifference,
  formatRelativeTimeDifference,
  formatConversionForSharing,
} from "../utils/timeConverter";

interface TimeConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
  cities: CityData[];
}

interface ConversionResult {
  city: CityData;
  convertedTime: Date;
  timeString: string;
  dateString: string;
  dayDifference: number;
  hourDifference: number;
  dayNightIcon: string;
}

// Common timezone options for the dropdown
const TIMEZONE_OPTIONS = [
  { value: "America/New_York", label: "Eastern Time (EST/EDT)" },
  { value: "America/Chicago", label: "Central Time (CST/CDT)" },
  { value: "America/Denver", label: "Mountain Time (MST/MDT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PST/PDT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
];

export default function TimeConverterModal({
  isOpen,
  onClose,
  cities,
}: TimeConverterModalProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  // Function to detect user's timezone
  const getUserTimezone = (): string => {
    try {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Check if the detected timezone is in our dropdown options
      const isSupported = TIMEZONE_OPTIONS.some(
        (option) => option.value === detectedTimezone
      );
      return isSupported ? detectedTimezone : "America/New_York";
    } catch (error) {
      console.warn("Timezone detection not supported:", error);
      return "America/New_York";
    }
  };

  const [timeInput, setTimeInput] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(() =>
    getUserTimezone()
  );
  const [conversionResults, setConversionResults] = useState<
    ConversionResult[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  // Parse time input and convert to all cities
  useEffect(() => {
    if (timeInput && selectedTimezone) {
      try {
        const parsedTime = parseTimeInput(timeInput);
        if (parsedTime) {
          const results = convertToAllCities(
            parsedTime.hours,
            parsedTime.minutes,
            selectedTimezone,
            cities
          );
          setConversionResults(results);
          setError(null);
        }
      } catch (err) {
        setError('Invalid time format. Try "3 PM", "15:30", or "noon"');
        setConversionResults([]);
      }
    } else {
      setConversionResults([]);
      setError(null);
    }
  }, [timeInput, selectedTimezone, cities]);

  // Convert time to all user's cities
  const convertToAllCities = (
    hours: number,
    minutes: number,
    sourceTimezone: string,
    cities: CityData[]
  ): ConversionResult[] => {
    return cities.map((city) => {
      // Create a base time for today with the specified hours and minutes
      const today = new Date();
      const baseTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
        0,
        0
      );

      // Create the equivalent time in the source timezone
      const sourceTime = createTimeInTimezone(baseTime, sourceTimezone);

      // Create the equivalent time in the target timezone
      const cityTime = createTimeInTimezone(baseTime, city.timezone);

      // Format time and date for display in the city's timezone
      const timeString = formatTimeInTimezone(baseTime, city.timezone, true);
      const dateString = formatDateInTimezone(baseTime, city.timezone);

      // Calculate differences between source and target
      const dayDifference = calculateDayDifference(sourceTime, cityTime);
      const hourDifference = calculateHourDifference(sourceTime, cityTime);

      // Get day/night icon based on the hour in the city's timezone
      const cityHour = getHourInTimezone(baseTime, city.timezone);
      const dayNightIcon = getDayNightIcon(cityHour);

      return {
        city,
        convertedTime: cityTime,
        timeString,
        dateString,
        dayDifference,
        hourDifference,
        dayNightIcon,
      };
    });
  };

  // Create a time representation in a specific timezone
  const createTimeInTimezone = (baseTime: Date, timezone: string): Date => {
    // Get the time as it appears in the specified timezone
    const timeInTimezone = new Date(
      baseTime.toLocaleString("en-US", { timeZone: timezone })
    );
    return timeInTimezone;
  };

  // Format time in a specific timezone
  const formatTimeInTimezone = (
    baseTime: Date,
    timezone: string,
    hour12: boolean = true
  ): string => {
    return baseTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: hour12,
      timeZone: timezone,
    });
  };

  // Format date in a specific timezone
  const formatDateInTimezone = (baseTime: Date, timezone: string): string => {
    return baseTime.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: timezone,
    });
  };

  // Get the hour in a specific timezone
  const getHourInTimezone = (baseTime: Date, timezone: string): number => {
    const timeString = baseTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: timezone,
    });
    return parseInt(timeString.split(":")[0]);
  };

  // Format relative time difference
  const formatTimeDifference = (result: ConversionResult): string => {
    return formatRelativeTimeDifference(
      result.hourDifference,
      result.dayDifference
    );
  };

  // Copy results to clipboard
  const handleCopy = async () => {
    if (conversionResults.length === 0) return;

    const results = conversionResults.map((result) => ({
      cityId: result.city.id,
      cityName: result.city.name,
      country: result.city.country,
      timezone: result.city.timezone,
      convertedTime: result.convertedTime,
      timeString: result.timeString,
      dateString: result.dateString,
      dayDifference: result.dayDifference,
      hourDifference: result.hourDifference,
      dayNightIcon: result.dayNightIcon,
      relativeDifference: formatTimeDifference(result),
    }));

    const text = formatConversionForSharing(
      timeInput,
      selectedTimezone,
      results
    );

    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Group gap="xs">
          <IconClock size={20} style={{ color: "#f97316" }} />
          <Text fw={600} size="lg">
            Quick Time Converter
          </Text>
        </Group>
      }
      size="lg"
      centered
      styles={{
        content: {
          background: isDark
            ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        },
        header: {
          background: "transparent",
          borderBottom: isDark ? "1px solid #475569" : "1px solid #e2e8f0",
        },
      }}
    >
      <Stack gap="lg">
        {/* Input Section */}
        <Group grow>
          <TextInput
            label="What time is:"
            placeholder="3 PM, 15:30, noon"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            leftSection={<IconClock size={16} />}
            error={error}
            styles={{
              input: {
                fontSize: "1.1rem",
                fontWeight: 500,
              },
            }}
          />
          <Select
            label="In timezone:"
            data={TIMEZONE_OPTIONS}
            value={selectedTimezone}
            onChange={(value) =>
              setSelectedTimezone(value || "America/New_York")
            }
            searchable
          />
        </Group>

        {/* Results Section */}
        {conversionResults.length > 0 && (
          <>
            <Divider label="In your cities:" labelPosition="left" />

            <ScrollArea h={300}>
              <Stack gap="xs">
                {conversionResults.map((result) => (
                  <Box
                    key={result.city.id}
                    p="md"
                    style={{
                      background: isDark
                        ? "rgba(51, 65, 85, 0.5)"
                        : "rgba(248, 250, 252, 0.8)",
                      borderRadius: "8px",
                      border: isDark
                        ? "1px solid #475569"
                        : "1px solid #e2e8f0",
                    }}
                  >
                    <Group justify="space-between" align="center">
                      <Group gap="sm">
                        <Text size="lg">{result.city.name}</Text>
                        <Text size="sm" c="dimmed">
                          {result.city.country}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <Text fw={600} size="lg">
                          {result.timeString} {result.dayNightIcon}
                        </Text>
                        <Text size="sm" c="dimmed">
                          ({formatTimeDifference(result)})
                        </Text>
                      </Group>
                    </Group>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>

            {/* Action Buttons */}
            <Group justify="center" gap="md">
              <Button
                variant="light"
                leftSection={<IconCopy size={16} />}
                onClick={handleCopy}
              >
                Copy All
              </Button>
            </Group>
          </>
        )}

        {/* Empty State */}
        {!timeInput && (
          <Box ta="center" py="xl">
            <Text c="dimmed" size="lg">
              Enter a time above to see it converted to all your cities
            </Text>
            <Text c="dimmed" size="sm" mt="xs">
              Try "3 PM EST", "15:30", or "noon"
            </Text>
          </Box>
        )}
      </Stack>
    </Modal>
  );
}
