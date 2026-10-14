import { appIcon } from "@/lib/app-icon";

// Fixed URL for the web app manifest.
export function GET() {
  return appIcon(512);
}
