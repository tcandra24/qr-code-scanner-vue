import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Qr Code Scanner",
        short_name: "QR Scanner",
        description: "An App To Scan QR Code For General Purpose",
        icons: [
          {
            src: "favicon.ico",
            sizes: "192x192",
            type: "image/x-icon",
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
