import cls from "@/utils/class_names";

type GridVariant = "hero" | "category" | "scene";

const VARIANTS: Record<
    GridVariant,
    {opacity: string; size: string; mask?: string}
> = {
    hero: {
        opacity: "0.06",
        size: "48px",
        mask: "radial-gradient(ellipse 80% 70% at 30% 20%, black 20%, transparent 75%)",
    },
    category: {
        opacity: "0.05",
        size: "48px",
        mask: "radial-gradient(ellipse 70% 60% at 20% 0%, black 15%, transparent 70%)",
    },
    scene: {
        opacity: "0.05",
        size: "40px",
    },
};

interface LabsGridProps {
    variant?: GridVariant;
    className?: string;
    glow?: boolean;
}

function LabsGrid({variant = "hero", className, glow = false}: LabsGridProps) {
    const config = VARIANTS[variant];

    return (
        <>
            <div
                aria-hidden
                className={cls("pointer-events-none absolute inset-0", className)}
                style={{
                    backgroundImage: `linear-gradient(rgba(139,139,255,${config.opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(139,139,255,${config.opacity}) 1px, transparent 1px)`,
                    backgroundSize: `${config.size} ${config.size}`,
                    ...(config.mask ? {maskImage: config.mask} : {}),
                }}
            />
            {glow ? (
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/4 top-0 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(110,110,240,0.28),transparent_65%)] blur-3xl"
                    style={{animation: "labs-glow-pulse 6s ease-in-out infinite"}}
                />
            ) : null}
        </>
    );
}

export default LabsGrid;
