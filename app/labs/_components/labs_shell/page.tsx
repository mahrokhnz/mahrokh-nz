import cls from "@/utils/class_names";

interface LabsShellProps {
    children: React.ReactNode;
    className?: string;
}

function LabsShell({children, className}: LabsShellProps) {
    return (
        <main className={cls("min-h-screen bg-[#050508] text-white", className)}>
            {children}
        </main>
    );
}

export default LabsShell;
