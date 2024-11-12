import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["vite.svg"],
      manifest: {
        name: "Qr Code Scanner",
        short_name: "QR Scanner",
        description: "An App To Scan QR Code For General Purpose",
        icons: [
          {
            src: "vite.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
        ],
        theme_color: "#6365f1",
        background_color: "#E8EBF2",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
    }),
  ],
});
