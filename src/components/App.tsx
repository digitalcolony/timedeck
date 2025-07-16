import { MantineProvider, createTheme, Container, Title, Text } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Container size="xl" py="xl">
        <Title order={1} ta="center" mb="xl">
          World Clock Dashboard
        </Title>
        <Text ta="center" c="dimmed">
          Select cities to track time across different time zones
        </Text>
      </Container>
    </MantineProvider>
  );
}