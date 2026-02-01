import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "./public/manifest.json",
          dest: ".",
        },
      ],
    }),
    tailwindcss(),
  ],
  build: {
    outDir: "build",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./index.html",
        content: "./src/content/extractors/ content.ts",
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "content") {
            return "content.js";
          }
          return "[name].js";
        },
      },
    },
  },
});
