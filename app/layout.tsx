import type { Metadata } from "next";
import "./globals.css";
import '../theme/colors.sass'
import localFont from 'next/font/local'
import Container from "@/app/_ui/container/page";
import Header from "@/app/_ui/header/page";

const myFont = localFont({
  src: [
    {
      path: '../public/fonts/josefin_sans/JosefinSans-Bold.ttf',
      style: 'bold',
    },
    {
      path: '../public/fonts/josefin_sans/JosefinSans-Italic.ttf',
      style: 'italic',
    },
    {
      path: '../public/fonts/josefin_sans/JosefinSans-Light.ttf',
      style: 'light',
    },
    {
      path: '../public/fonts/josefin_sans/JosefinSans-Medium.ttf',
      style: 'medium',
    },
    {
      path: '../public/fonts/josefin_sans/JosefinSans-Regular.ttf',
      style: 'regular',
    },
    {
      path: '../public/fonts/josefin_sans/JosefinSans-SemiBold.ttf',
      style: 'semi bold',
    },
    {
      path: '../public/fonts/josefin_sans/JosefinSans-Thin.ttf',
      style: 'thin',
    }
  ],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
      <Header />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
