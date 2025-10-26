import styles from "./page.module.sass";
import Link from 'next/link';
import cls from "@/utils/class_names";
import data from '@/data/db.json'

interface MenuProps {
    isOpen?: boolean;
    isFooter?: boolean;
}

function Menu({isOpen = false, isFooter = false}: MenuProps) {
    const {menu} = data

    return (
        <ul className={cls(!isFooter ? styles.headerMenu : styles.footerMenu, styles.menu, isOpen && styles.open)}>
            {menu.map((item) => (
                <li key={item.id}><Link href={item.link}>{item.title}</Link></li>
            ))}
        </ul>
    );
}

export default Menu
