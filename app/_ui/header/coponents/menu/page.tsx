import styles from "./page.module.sass";
import Link from 'next/link'
import cls from "@/utils/class_names";

export default function Menu({isOpen}) {
    return (
        <ul className={cls(styles.menu, isOpen && styles.open)}>
            <li><Link href="">Home</Link></li>
            <li><Link href="">About</Link></li>
            <li><Link href="">Projects</Link></li>
            <li><Link href="">Resume</Link></li>
            <li><Link href="">Contact</Link></li>
        </ul>
    );
}
