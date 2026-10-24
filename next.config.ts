import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to `out/` for GitHub Pages.
  output: "export",
  experimental: { globalNotFound: true },
  // Emit `/about/index.html` instead of `/about.html` so every static host resolves it.
  trailingSlash: true,
  // The default image optimizer needs a server; images are pre-sized instead.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
