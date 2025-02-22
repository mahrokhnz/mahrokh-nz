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
    const [theme, setTheme] = useState('dark');

    //TODO: default to dark

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setTheme(initialTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

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
