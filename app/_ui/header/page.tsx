import styles from "./page.module.sass";
import Link from "next/link";
import Controller from "@/app/_ui/header/components/controller/page";

function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link href="/">
                    <div className={styles.logo}>
                        <span className={styles.moon}>MAH</span>
                        <span className={styles.face}>rokh</span>
                    </div>
                </Link>
                <Controller />
            </nav>
        </header>
    );
}

export default Header