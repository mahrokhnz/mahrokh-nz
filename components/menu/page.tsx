"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import cls from "@/utils/class_names";
import data from "@/data/db.json";
import BetaBadge from "@/components/beta_icon/page";

interface MenuProps {
    isOpen?: boolean;
    isFooter?: boolean;
    onItemClick?: () => void;
}

function Menu({isOpen = false, isFooter = false, onItemClick}: MenuProps) {
    const {menu} = data;
    const pathname = usePathname();
    const isLabs = pathname?.startsWith("/labs");
    const [pendingHref, setPendingHref] = useState<string | null>(null);

    useEffect(() => {
        if (!pendingHref) return;

        const matches =
            pendingHref === "/"
                ? pathname === "/"
                : pathname === pendingHref || pathname?.startsWith(`${pendingHref}/`);

        if (matches) {
            setPendingHref(null);
            onItemClick?.();
        }
    }, [pathname, pendingHref, onItemClick]);

    const handleItemClick = (link: string, isActive: boolean) => {
        if (isFooter) {
            onItemClick?.();
            return;
        }

        if (isActive) {
            setPendingHref(null);
            onItemClick?.();
            return;
        }

        setPendingHref(link);
        window.setTimeout(() => onItemClick?.(), 320);
    };

    return (
        <ul
            className={cls(
                "flex gap-8",
                isFooter ? "flex-wrap justify-center gap-4 text-(--footerMuted)" : "text-(--neutralColor)",
                !isFooter &&
                "max-tablet:fixed max-tablet:inset-0 max-tablet:z-[5] max-tablet:flex max-tablet:h-screen max-tablet:flex-col max-tablet:items-center max-tablet:justify-center max-tablet:bg-(--secondaryColor) max-tablet:text-(--textColor) max-tablet:transition-transform max-tablet:duration-300 max-tablet:ease-in-out",
                !isFooter && (isOpen ? "max-tablet:translate-x-0" : "max-tablet:-translate-x-full"),
                isLabs && !isFooter && "max-tablet:bg-[#050508]"
            )}
        >
            {menu.map((item) => {
                const isActive =
                    item.link === "/"
                        ? pathname === "/"
                        : pathname === item.link || pathname?.startsWith(`${item.link}/`);
                const isPending = !isFooter && pendingHref === item.link;
                const hasBeta = "badge" in item && item.badge === "beta";

                return (
                    <li
                        key={item.id}
                        className={!isFooter ? "max-tablet:text-[1.5rem] max-tablet:uppercase" : undefined}
                    >
                        <Link
                            href={item.link}
                            onClick={() => handleItemClick(item.link, isActive)}
                            className={cls(
                                "inline-flex items-center gap-1.5 transition-colors duration-300",
                                isFooter && isActive && "text-(--footerText)",
                                isFooter && !isActive && "hover:text-(--footerText)",
                                !isFooter &&
                                isActive &&
                                !isPending &&
                                (isLabs
                                    ? "text-[var(--labs-accent)]"
                                    : "text-(--textColor) max-tablet:text-(--firstWaveColor)"),
                                !isFooter && !isActive && !isPending && "hover:text-(--textColor)",
                                !isFooter &&
                                (isPending || isActive) &&
                                (isLabs
                                    ? "max-tablet:scale-105 max-tablet:text-[var(--labs-accent)] max-tablet:drop-shadow-[0_0_12px_color-mix(in_srgb,var(--labs-accent)_55%,transparent)]"
                                    : "max-tablet:scale-105 max-tablet:text-(--firstWaveColor) max-tablet:drop-shadow-[0_0_12px_color-mix(in_srgb,var(--firstWaveColor)_55%,transparent)]")
                            )}
                        >
                            {item.title}
                            {hasBeta ? (
                                <BetaBadge
                                    variant={isFooter ? "footer" : isLabs ? "labs" : "default"}
                                />
                            ) : null}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default Menu;
