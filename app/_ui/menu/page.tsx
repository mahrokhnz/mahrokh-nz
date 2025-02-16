import styles from "./page.module.sass";
import Link from 'next/link';
import cls from "@/utils/class_names";

interface MenuProps {
    isOpen?: boolean;
    isFooter?: boolean;
}

export default function Menu({ isOpen, isFooter }: MenuProps) {
    return (
        <ul className={cls(!isFooter ? styles.headerMenu : styles.footerMenu ,styles.menu, isOpen && styles.open)}>
            <li><Link href="/public">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/resume">Resume</Link></li>
            <li><Link href="/contact">Contact</Link></li>
        </ul>
    );
}
