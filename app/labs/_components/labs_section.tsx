import cls from "@/utils/class_names";

export const labsPadding = "px-24 max-tablet:px-8 max-phone:px-[1.1rem]";

type LabsSectionTag = "section" | "header" | "footer" | "div";

interface LabsSectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    as?: LabsSectionTag;
}

function LabsSection({children, className, as: Tag = "section", ...props}: LabsSectionProps) {
    return (
        <Tag className={cls("relative", labsPadding, className)} {...props}>
            {children}
        </Tag>
    );
}

export default LabsSection;
