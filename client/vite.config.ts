import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 1600, // bump warning threshold
    rollupOptions: {
      output: {
        manualChunks(id) {
          // put each dependency in node_modules into its own chunk
          if (id.includes("node_modules")) {
            const parts = id.split("node_modules/");
            if (parts[1]) {
              const pkg = parts[1].split("/")[0];
              return pkg; // each package gets its own chunk
            }
          }
        },
      },
    },
  },
});
