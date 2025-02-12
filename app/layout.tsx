import "./globals.css";
import '../theme/colors.sass';
import localFont from 'next/font/local';
import Container from "@/app/_ui/container/page";
import Header from "@/app/_ui/header/page";
import { ThemeProvider } from "@/context/theme_context";

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

export default function RootLayout({ children }) {
    return (
        <ThemeProvider>
            <html lang="en">
            <body className={myFont.className}>
            <Header />
            {children}
            </body>
            </html>
        </ThemeProvider>
    );
}