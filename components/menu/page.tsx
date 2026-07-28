"use client";

import Link from "next/link";
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

    return (
        <ul
            className={cls(
                "flex gap-8 text-(--neutralColor)",
                !isFooter &&
                    "max-tablet:fixed max-tablet:inset-0 max-tablet:flex max-tablet:h-screen max-tablet:flex-col max-tablet:items-center max-tablet:justify-center max-tablet:bg-(--neutralColor) max-tablet:text-(--textColor) max-tablet:z-[5] max-tablet:transition-transform max-tablet:duration-300 max-tablet:ease-in-out",
                !isFooter && (isOpen ? "max-tablet:translate-x-0" : "max-tablet:-translate-x-full"),
                isFooter && "flex-wrap justify-center gap-4",
                isLabs && !isFooter && "max-tablet:bg-[#050508]"
            )}
        >
            {menu.map((item) => {
                const isActive =
                    item.link === "/"
                        ? pathname === "/"
                        : pathname === item.link || pathname?.startsWith(`${item.link}/`);
                const hasBeta = "badge" in item && item.badge === "beta";

                return (
                    <li
                        key={item.id}
                        className={!isFooter ? "max-tablet:text-[1.5rem] max-tablet:uppercase" : undefined}
                    >
                        <Link
                            href={item.link}
                            onClick={onItemClick}
                            className={cls(
                                "inline-flex items-center gap-1.5 transition-colors duration-300",
                                isActive && (isLabs ? "text-[var(--labs-accent)]" : "text-(--textColor)"),
                                !isActive && "hover:text-(--textColor)"
                            )}
                        >
                            {item.title}
                            {hasBeta ? <BetaBadge variant={isLabs ? "labs" : "default"} /> : null}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default Menu;
