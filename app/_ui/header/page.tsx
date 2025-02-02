import styles from "./page.module.sass";
import Menu from "@/app/_ui/header/coponents/menu/page";
import Theme from "@/app/_ui/header/coponents/theme/page";
import BurgerButton from "@/app/_ui/header/coponents/burger_button/page";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <span className={styles.moon}>MAH</span>
                    <span className={styles.face}>rokh</span>
                </div>
                <div className={styles.wrapper}>
                    <Menu/>
                    <Theme/>
                    <BurgerButton/>
                </div>
            </nav>
        </header>
    );
}
