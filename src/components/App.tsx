import React from "react";
import {
  MantineProvider,
  createTheme,
  Container,
  Title,
  Text,
  Alert,
  ActionIcon,
  Group,
} from "@mantine/core";
import { IconInfoCircle, IconSun, IconMoon } from "@tabler/icons-react";
import { useLocalStorage, useColorScheme } from "@mantine/hooks";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "@mantine/core/styles.css";
import { useCityManager } from "../hooks/useCityManager";
import CitySelector from "./CitySelector";
import CityGrid from "./CityGrid";
import Footer from "./Footer";


// Lazy load PerformancePanel to reduce initial bundle size
const PerformancePanel = React.lazy(() => import("./PerformancePanel"));
import type { CityData } from "../types";

const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "Poppins, system-ui, sans-serif",
  headings: {
    fontFamily: "Poppins, system-ui, sans-serif",
    fontWeight: "600",
  },
  colors: {
    // Travel-inspired color palette
    ocean: [
      "#eff6ff", // lightest
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6", // base
      "#2563eb",
      "#1d4ed8",
      "#1e40af", // primary
      "#1e3a8a", // darkest
    ],
    sunset: [
      "#fff7ed",
      "#ffedd5",
      "#fed7aa",
      "#fdba74",
      "#fb923c",
      "#f97316", // base
      "#ea580c",
      "#dc2626",
      "#c2410c",
      "#9a3412",
    ],
    forest: [
      "#f0fdf4",
      "#dcfce7",
      "#bbf7d0",
      "#86efac",
      "#4ade80",
      "#22c55e",
      "#16a34a", // base
      "#15803d",
      "#166534",
      "#14532d",
    ],
  },
  other: {
    // Custom gradients for travel theme
    gradients: {
      worldTraveler: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      oceanSunset: "linear-gradient(135deg, #1e40af 0%, #f97316 100%)",
      adventureSpirit: "linear-gradient(135deg, #16a34a 0%, #2563eb 100%)",
    },
  },
});

export default function App() {
  // Get system preference
  const systemColorScheme = useColorScheme();
  
  // Theme management - check localStorage first, then fall back to system preference
  const [colorScheme, setColorScheme] = useLocalStorage<"light" | "dark">({
    key: "timedeck-color-scheme",
    defaultValue: systemColorScheme, // Use system preference as default
    getInitialValueInEffect: false, // Get value immediately, not in effect
  });

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  // Check URL parameter to show/hide performance panel
  const [showPerformancePanel, setShowPerformancePanel] = React.useState(false);

  React.useEffect(() => {
    // Check for ?perf=1 in URL
    const urlParams = new URLSearchParams(window.location.search);
    setShowPerformancePanel(urlParams.get("perf") === "1");
  }, []);

  const { cities, addCity, removeCity, reorderCities, isLoading, hasStorageSupport, error } =
    useCityManager();

  const handleCitySelect = (city: CityData) => {
    const success = addCity(city);
    if (!success) {
      // Error handling is managed by the useCityManager hook
      console.log("Failed to add city");
    }
  };

  const handleCityRemove = (cityId: string) => {
    removeCity(cityId);
  };

  const selectedCityIds = cities.map((city) => city.id);

  return (
    <MantineProvider theme={theme} forceColorScheme={colorScheme}>
      <DndProvider backend={HTML5Backend}>
        <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            colorScheme === "dark"
              ? `
              linear-gradient(135deg, #0f172a 0%, #1e293b 100%),
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)
            `
              : `
              linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%),
              radial-gradient(circle at 20% 80%, rgba(30, 64, 175, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)
            `,
          backgroundAttachment: "fixed",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Container size="xl" py="xl">
          {/* Theme Toggle Button */}
        <Group justify="flex-end" mb="lg">
          <ActionIcon
            onClick={toggleColorScheme}
            variant="subtle"
            size="lg"
            aria-label="Toggle color scheme"
            style={{
              background:
                colorScheme === "dark"
                  ? "linear-gradient(135deg, #374151 0%, #4b5563 100%)"
                  : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
              border:
                colorScheme === "dark"
                  ? "1px solid #4b5563"
                  : "1px solid #d1d5db",
              transition: "all 0.2s ease",
            }}
          >
            {colorScheme === "dark" ? (
              <IconSun size={20} style={{ color: "#fbbf24" }} />
            ) : (
              <IconMoon size={20} style={{ color: "#6366f1" }} />
            )}
          </ActionIcon>
        </Group>

        <Title
          order={1}
          ta="center"
          mb="md"
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "3rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          ⏰ TimeDeck
        </Title>
        <Text
          ta="center"
          c="dimmed"
          mb="xl"
          size="lg"
          style={{ fontWeight: 500 }}
        >
          Your global time dashboard • Track multiple cities
        </Text>

        {/* Storage warning - only show if storage is unavailable AND user has cities */}
        {!hasStorageSupport && cities.length > 0 && (
          <Alert
            icon={<IconInfoCircle size={16} />}
            title="Storage not available"
            color="yellow"
            mb="lg"
          >
            Your selected cities will not be saved between browser sessions.
          </Alert>
        )}

        {/* Error display */}
        {error && (
          <Alert
            icon={<IconInfoCircle size={16} />}
            title="Notice"
            color="red"
            mb="lg"
          >
            {error}
          </Alert>
        )}

        {/* City selector */}
        <CitySelector
          onCitySelect={handleCitySelect}
          selectedCityIds={selectedCityIds}
        />

        {/* Loading state */}
        {isLoading ? (
          <Text ta="center" c="dimmed">
            Loading your cities...
          </Text>
        ) : (
          /* City grid */
          <CityGrid cities={cities} onRemoveCity={handleCityRemove} onReorderCities={reorderCities} />
        )}
          </Container>
        </div>

        <Footer />

        {/* Performance Panel - Only show when ?perf=1 is in URL */}
        {showPerformancePanel && (
          <React.Suspense fallback={null}>
            <PerformancePanel />
          </React.Suspense>
        )}
      </div>
      </DndProvider>
    </MantineProvider>
  );
}
