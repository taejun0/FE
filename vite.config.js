import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  server:
    process.env.NODE_ENV === "development"
      ? {
          https: {
            key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
            cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
          },
        }
      : {},
  plugins: [react()],

  resolve: {
    alias: {
      "@apis": path.resolve(__dirname, "src/apis"),
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
