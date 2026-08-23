import Footer from "@/components/footer/page";

interface SiteLayoutProps {
    children: React.ReactNode;
}

function SiteLayout({children}: SiteLayoutProps) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}

export default SiteLayout;
