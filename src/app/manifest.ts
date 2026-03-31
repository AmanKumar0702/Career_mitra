import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Learn2Earn",
    short_name: "Learn2Earn",
    description: "Learn, Test & Build Your Career — Free platform for Indian students",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1e",
    theme_color: "#06b6d4",
    orientation: "portrait",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    categories: ["education", "productivity"],
    lang: "en-IN",
  };
}
