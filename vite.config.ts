import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "monitoreo de estacionamientos",
        short_name: "monitoreo alameda",
        description: "app para monitorear entradas y salidas vehiculares del condominio alameda central",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "./public/android/android-launchericon-512-512.png",
            sizes: "512x512",
          },
          {
            src: "./public/android/android-launchericon-192-192.png",
            sizes: "192x192",
          },
          {
            src: "./public/android/android-launchericon-144-144.png",
            sizes: "144x144",
          },
          {
            src: "./public/android/android-launchericon-96-96.png",
            sizes: "96x96",
          },
          {
            src: "./public/android/android-launchericon-72-72.png",
            sizes: "72x72",
          },
          {
            src: "./public/android/android-launchericon-48-48.png",
            sizes: "48x48",
          },
          {
            src: "./public/ios/16.png",
            sizes: "16x16",
          },
          {
            src: "./public/ios/20.png",
            sizes: "20x20",
          },
          {
            src: "./public/ios/29.png",
            sizes: "29x29",
          },
          {
            src: "./public/ios/32.png",
            sizes: "32x32",
          },
          {
            src: "./public/ios/40.png",
            sizes: "40x40",
          },
          {
            src: "./public/ios/50.png",
            sizes: "50x50",
          },
          {
            src: "./public/ios/57.png",
            sizes: "57x57",
          },
          {
            src: "./public/ios/58.png",
            sizes: "58x58",
          },
          {
            src: "./public/ios/60.png",
            sizes: "60x60",
          },
          {
            src: "./public/ios/64.png",
            sizes: "64x64",
          },
          {
            src: "./public/ios/72.png",
            sizes: "72x72",
          },
          {
            src: "./public/ios/76.png",
            sizes: "76x76",
          },
          {
            src: "./public/ios/80.png",
            sizes: "80x80",
          },
          {
            src: "./public/ios/87.png",
            sizes: "87x87",
          },
          {
            src: "./public/ios/100.png",
            sizes: "100x100",
          },
          {
            src: "./public/ios/114.png",
            sizes: "114x114",
          },
          {
            src: "./public/ios/120.png",
            sizes: "120x120",
          },
          {
            src: "./public/ios/128.png",
            sizes: "128x128",
          },
          {
            src: "./public/ios/144.png",
            sizes: "144x144",
          },
          {
            src: "./public/ios/152.png",
            sizes: "152x152",
          },
          {
            src: "./public/ios/167.png",
            sizes: "167x167",
          },
          {
            src: "./public/ios/180.png",
            sizes: "180x180",
          },
          {
            src: "./public/ios/192.png",
            sizes: "192x192",
          },
          {
            src: "./public/ios/256.png",
            sizes: "256x256",
          },
          {
            src: "./public/ios/512.png",
            sizes: "512x512",
          },
          {
            src: "./public/ios/1024.png",
            sizes: "1024x1024",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
