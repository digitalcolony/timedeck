import { MantineProvider, createTheme, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
});

interface Props {
  children: React.ReactNode;
}

export default function CustomMantineProvider({ children }: Props) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}

export { ColorSchemeScript };