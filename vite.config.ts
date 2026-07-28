import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function resolveBasePath() {
  if (process.env.BASE_PATH) {
    const path = process.env.BASE_PATH;
    return path.endsWith("/") ? path : `${path}/`;
  }

  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (process.env.GITHUB_ACTIONS === "true" && repositoryName) {
    return repositoryName.endsWith(".github.io") ? "/" : `/${repositoryName}/`;
  }

  return "/";
}

export default defineConfig({
  base: resolveBasePath(),
  plugins: [react()],
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
