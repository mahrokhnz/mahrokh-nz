import styles from "./page.module.sass";
import Link from 'next/link'

export default function Menu() {
    return (
        <ul className={styles.menu}>
            <li><Link href="">Home</Link></li>
            <li><Link href="">About</Link></li>
            <li><Link href="">Projects</Link></li>
            <li><Link href="">Resume</Link></li>
            <li><Link href="">Contact</Link></li>
        </ul>
    );
}
