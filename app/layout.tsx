import "./globals.sass";
import localFont from 'next/font/local';
import type { Metadata, Viewport } from "next";
import Header from "@/components/header/page";
import { CustomThemeProvider } from "@/context/theme_context";
import { ThemeProvider } from '@mui/material/styles';
import Footer from "@/components/footer/page";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme/theme";
import { SITE_NAME, SITE_URL } from "@/config/seo";
import { AppColors } from "@/theme/colors";

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

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
        default: SITE_NAME,
        template: `${SITE_NAME} | %s`,
    },
    description: "Personal portfolio and blog for Mahrokh Nabizadeh, featuring projects, skills, and writing.",
    manifest: "/manifest.webmanifest",
    icons: {
        icon: [
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: SITE_NAME,
    },
    formatDetection: {
        telephone: false,
    },
};

export const viewport: Viewport = {
    themeColor: AppColors.primary,
};

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
