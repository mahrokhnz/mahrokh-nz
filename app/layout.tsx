import "./globals.sass";
import localFont from 'next/font/local';
import Header from "@/app/_ui/header/page";
import { CustomThemeProvider } from "@/context/theme_context";
import { ThemeProvider } from '@mui/material/styles';
import Footer from "@/app/_ui/footer/page";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme/theme";

import { SpeedInsights } from "@vercel/speed-insights/next"

const myFont = localFont({
    src: [
        {
            path: '../public/fonts/josefin_sans/JosefinSans-Bold.ttf',
            style: 'normal',
            weight: '700'
        },
        {
            path: '../public/fonts/josefin_sans/JosefinSans-Italic.ttf',
            style: 'italic',
            weight: '400'
        },
        {
            path: '../public/fonts/josefin_sans/JosefinSans-Light.ttf',
            style: 'normal',
            weight: '300'
        },
        {
            path: '../public/fonts/josefin_sans/JosefinSans-Medium.ttf',
            style: 'normal',
            weight: '500'
        },
        {
            path: '../public/fonts/josefin_sans/JosefinSans-Regular.ttf',
            style: 'normal',
            weight: '400'
        },
        {
            path: '../public/fonts/josefin_sans/JosefinSans-SemiBold.ttf',
            style: 'normal',
            weight: '600'
        },
        {
            path: '../public/fonts/josefin_sans/JosefinSans-Thin.ttf',
            style: 'normal',
            weight: '100'
        }
    ]
});

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
        return (
            <html lang="en">
                <body className={myFont.className}>
                    <CustomThemeProvider>
                        <AppRouterCacheProvider>
                            <ThemeProvider theme={theme}>
                                <Header/>
                                {children}
                                <SpeedInsights/>
                                <Footer/>
                            </ThemeProvider>
                        </AppRouterCacheProvider>
                    </CustomThemeProvider>
                </body>
            </html>
    );
}