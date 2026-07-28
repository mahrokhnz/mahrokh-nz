import Link from 'next/link';
import cls from "@/utils/class_names";
import data from '@/data/db.json'

interface MenuProps {
    isOpen?: boolean;
    isFooter?: boolean;
    onItemClick?: () => void;
}

function Menu({isOpen = false, isFooter = false, onItemClick}: MenuProps) {
    const {menu} = data

    return (
        <ul className={cls(
            "flex gap-8 text-(--neutralColor)",
            !isFooter && "max-tablet:fixed max-tablet:inset-0 max-tablet:flex max-tablet:h-screen max-tablet:flex-col max-tablet:items-center max-tablet:justify-center max-tablet:bg-(--neutralColor) max-tablet:text-(--textColor) max-tablet:z-[5] max-tablet:transition-transform max-tablet:duration-300 max-tablet:ease-in-out",
            !isFooter && (isOpen ? "max-tablet:translate-x-0" : "max-tablet:-translate-x-full"),
            isFooter && "flex-wrap justify-center gap-4"
        )}>
            {menu.map((item) => (
                <li key={item.id} className={!isFooter ? "max-tablet:text-[1.5rem] max-tablet:uppercase" : undefined}>
                    <Link href={item.link} onClick={onItemClick}>{item.title}</Link>
                </li>
            ))}
        </ul>
    );
}

export default Menu
