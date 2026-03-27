import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ColorTheme = "green" | "purple" | "black" | "silverblue" | "rose";

const THEME_STORAGE_KEY = "zentragig-color-theme";

const themeConfigs: Record<ColorTheme, {
  primary: string;
  primaryForeground: string;
  ring: string;
  sidebarBg: string;
  sidebarAccent: string;
  sidebarBorder: string;
  gradientHero: string;
}> = {
  green: {
    primary: "145 63% 32%",
    primaryForeground: "0 0% 100%",
    ring: "145 63% 32%",
    sidebarBg: "145 63% 32%",
    sidebarAccent: "145 55% 40%",
    sidebarBorder: "145 50% 28%",
    gradientHero: "linear-gradient(135deg, hsl(145 63% 32%) 0%, hsl(145 70% 22%) 100%)",
  },
  purple: {
    primary: "270 60% 50%",
    primaryForeground: "0 0% 100%",
    ring: "270 60% 50%",
    sidebarBg: "270 60% 50%",
    sidebarAccent: "270 55% 58%",
    sidebarBorder: "270 50% 42%",
    gradientHero: "linear-gradient(135deg, hsl(270 60% 50%) 0%, hsl(270 65% 38%) 100%)",
  },
  black: {
    primary: "0 0% 15%",
    primaryForeground: "0 0% 100%",
    ring: "0 0% 15%",
    sidebarBg: "0 0% 10%",
    sidebarAccent: "0 0% 20%",
    sidebarBorder: "0 0% 15%",
    gradientHero: "linear-gradient(135deg, hsl(0 0% 15%) 0%, hsl(0 0% 5%) 100%)",
  },
  silverblue: {
    primary: "210 50% 45%",
    primaryForeground: "0 0% 100%",
    ring: "210 50% 45%",
    sidebarBg: "210 50% 45%",
    sidebarAccent: "210 45% 55%",
    sidebarBorder: "210 45% 38%",
    gradientHero: "linear-gradient(135deg, hsl(210 50% 45%) 0%, hsl(210 55% 32%) 100%)",
  },
  rose: {
    primary: "350 65% 50%",
    primaryForeground: "0 0% 100%",
    ring: "350 65% 50%",
    sidebarBg: "350 65% 50%",
    sidebarAccent: "350 60% 58%",
    sidebarBorder: "350 55% 42%",
    gradientHero: "linear-gradient(135deg, hsl(350 65% 50%) 0%, hsl(350 70% 38%) 100%)",
  },
};

function applyTheme(theme: ColorTheme) {
  const config = themeConfigs[theme];
  const root = document.documentElement;
  root.style.setProperty("--primary", config.primary);
  root.style.setProperty("--primary-foreground", config.primaryForeground);
  root.style.setProperty("--ring", config.ring);
  root.style.setProperty("--sidebar-background", config.sidebarBg);
  root.style.setProperty("--sidebar-accent", config.sidebarAccent);
  root.style.setProperty("--sidebar-border", config.sidebarBorder);
  root.style.setProperty("--gradient-hero", config.gradientHero);
}

const validThemes: ColorTheme[] = ["green", "purple", "black", "silverblue", "rose"];
function isValidTheme(v: string | null | undefined): v is ColorTheme {
  return !!v && validThemes.includes(v as ColorTheme);
}

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colorTheme: "green",
  setColorTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = isValidTheme(saved) ? saved : "green";
    applyTheme(theme);
    return theme;
  });

  const setColorTheme = useCallback((theme: ColorTheme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    setColorThemeState(theme);
    applyTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorTheme() {
  return useContext(ThemeContext);
}

export const THEME_OPTIONS: { value: ColorTheme; label: string; color: string }[] = [
  { value: "green", label: "Green", color: "hsl(145 63% 32%)" },
  { value: "purple", label: "Purple", color: "hsl(270 60% 50%)" },
  { value: "black", label: "Black", color: "hsl(0 0% 15%)" },
  { value: "silverblue", label: "Silver Blue", color: "hsl(210 50% 45%)" },
  { value: "rose", label: "Rose", color: "hsl(350 65% 50%)" },
];
