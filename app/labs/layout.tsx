import LabsMode from "@/app/labs/_components/labs_mode";

interface LabsLayoutProps {
    children: React.ReactNode;
}

function LabsLayout({children}: LabsLayoutProps) {
    return <LabsMode>{children}</LabsMode>;
}

export default LabsLayout;
