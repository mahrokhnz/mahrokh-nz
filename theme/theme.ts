'use client';
import { createTheme } from '@mui/material/styles';

export const AppColors = {
    primary: '#544df0',
    secondary: '#6e6af4',
};

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: {
        primary: {
            main: AppColors.primary,
        },
        secondary: {
            main: AppColors.secondary,
        },
    },
});

export default theme;