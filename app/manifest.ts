import type { MetadataRoute } from "next";

// Lets phones install Randomz to the home screen and open it full screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Randomz",
    short_name: "Randomz",
    description: "Random letters, words, numbers, dice and teams for game night.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#4a1a63",
    theme_color: "#4a1a63",
    icons: [
      { src: "/pwa/192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
