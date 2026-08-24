import Link from "next/link";
import cls from "@/utils/class_names";

interface ArrowLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

function ArrowLink({href, children, className}: ArrowLinkProps) {
    return (
        <Link
            href={href}
            className={cls(
                "inline-flex items-center gap-1.5 text-base font-medium text-(--neutralColor) transition-colors duration-300 hover:text-(--firstWaveColor) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--firstWaveColor)",
                className
            )}
        >
            {children}
        </Link>
    );
}

export default ArrowLink;
