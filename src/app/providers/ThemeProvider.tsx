import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Read from local storage immediately to prevent flash of wrong theme
    const getInitialTheme = (): Theme => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("app-theme") as Theme;
            if (stored === "dark" || stored === "light") return stored;
        }
        return "dark"; // Default
    };

    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    // Also try to read from backend if user is authenticated
    const settings = useQuery(api.userSettings.get);

    // Sync state to dom
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("app-theme", theme);
    }, [theme]);

    // Sync backend settings to state when loaded
    useEffect(() => {
        if (settings && settings.theme && (settings.theme === "dark" || settings.theme === "light")) {
            setThemeState(settings.theme);
        }
    }, [settings]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
