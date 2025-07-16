import { Container, Title, Text } from '@mantine/core';

export default function Dashboard() {
  return (
    <Container size="xl" py="xl">
      <Title order={1} ta="center" mb="xl">
        World Clock Dashboard
      </Title>
      <Text ta="center" c="dimmed">
        Select cities to track time across different time zones
      </Text>
    </Container>
  );
}