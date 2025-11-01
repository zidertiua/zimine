import { createContext, useContext, useEffect, useState } from "react";

type Theme = "red-black" | "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
};

const initialState: ThemeProviderState = {
  theme: "red-black",
  setTheme: () => null,
  wallpaper: "",
  setWallpaper: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "red-black",
  storageKey = "zimine-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [wallpaper, setWallpaper] = useState<string>(
    () => localStorage.getItem("zimine-wallpaper") || ""
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "red-black");
    
    if (theme === "red-black") {
      root.classList.add("red-black");
    } else if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.add("light");
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    wallpaper,
    setWallpaper: (wallpaper: string) => {
      localStorage.setItem("zimine-wallpaper", wallpaper);
      setWallpaper(wallpaper);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
