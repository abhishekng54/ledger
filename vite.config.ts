import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite outputs to dist/, which Capacitor uses as its webDir.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
