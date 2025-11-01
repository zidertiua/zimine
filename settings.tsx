import { Settings } from "../settings";
import { ThemeProvider } from "@/lib/theme-provider";

export default function SettingsExample() {
  return (
    <ThemeProvider>
      <Settings />
    </ThemeProvider>
  );
}
