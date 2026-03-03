import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // Resolve convex/_generated from the shared backend
            "convex/_generated": fileURLToPath(
                new URL("../_convex-backend/convex/_generated", import.meta.url)
            ),
        },
    },
    server: {
        port: 5173,
    },
});
