import styles from "./page.module.sass";
import Link from 'next/link';
import cls from "@/utils/class_names";

interface MenuProps {
    isOpen?: boolean;
    isFooter?: boolean;
}

function Menu({ isOpen = false, isFooter = false }: MenuProps) {
    return (
        <ul className={cls(!isFooter ? styles.headerMenu : styles.footerMenu ,styles.menu, isOpen && styles.open)}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/contact">Contact</Link></li>
        </ul>
    );
}

export default Menu
