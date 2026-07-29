import cls from "@/utils/class_names";

export const labsPadding = "px-24 max-tablet:px-8 max-phone:px-[1.1rem]";

interface LabsSectionProps {
    children: React.ReactNode;
    className?: string;
    as?: "section" | "div";
}

function LabsSection({children, className, as: Tag = "section"}: LabsSectionProps) {
    return <Tag className={cls("relative", labsPadding, className)}>{children}</Tag>;
}

export default LabsSection;
