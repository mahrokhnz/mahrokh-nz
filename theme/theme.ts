'use client';
import {createTheme} from '@mui/material/styles';
import {AppColors} from "theme/colors";

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