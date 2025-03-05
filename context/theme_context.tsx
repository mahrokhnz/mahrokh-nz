"use client"

import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';

interface CustomThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

interface CustomCustomThemeProviderProps {
    children: ReactNode;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<CustomCustomThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme('dark'); // Set default theme to dark
        }
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    if (!theme) {
        return null;
    }

    return (
        <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </CustomThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a CustomThemeProvider');
    }
    return context;
};
