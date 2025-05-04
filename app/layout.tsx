import "./globals.sass";
import localFont from 'next/font/local';
import Header from "@/components/header/page";
import { CustomThemeProvider } from "@/context/theme_context";
import { ThemeProvider } from '@mui/material/styles';
import Footer from "@/components/footer/page";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme/theme";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const myFont = localFont({
    src: [
        { path: '../public/fonts/josefin_sans/JosefinSans-Regular.ttf', weight: '400', style: 'normal' },
        { path: '../public/fonts/josefin_sans/JosefinSans-SemiBold.ttf', weight: '600', style: 'normal' },
        { path: '../public/fonts/josefin_sans/JosefinSans-Bold.ttf', weight: '700', style: 'normal' },
    ],
    display: 'swap',
});

interface RootLayoutProps {
    children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
        <body className={myFont.className}>
        <CustomThemeProvider>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <Header />
                    {children}
                    <Footer />
                    <SpeedInsights />
                    <Analytics />
                </ThemeProvider>
            </AppRouterCacheProvider>
        </CustomThemeProvider>
        </body>
        </html>
    );
}

export default RootLayout;
