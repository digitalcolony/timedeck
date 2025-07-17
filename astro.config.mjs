// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "static",
  build: {
    assets: "assets",
    inlineStylesheets: "auto",
  },
  vite: {
    ssr: {
      noExternal: ["@mantine/core", "@mantine/hooks"],
    },
    build: {
      target: "es2020",
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            "mantine-core": ["@mantine/core"],
            "mantine-hooks": ["@mantine/hooks"],
            icons: ["@tabler/icons-react"],
            "react-vendor": ["react", "react-dom"],
          },
        },
      },
    },
    optimizeDeps: {
      include: ["@mantine/core", "@mantine/hooks", "@tabler/icons-react"],
    },
  },
});
