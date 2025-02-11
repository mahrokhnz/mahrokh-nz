"use client"

import styles from "./page.module.sass";
import Menu from "@/app/_ui/header/coponents/menu/page";
import Theme from "@/app/_ui/header/coponents/theme/page";
import BurgerButton from "@/app/_ui/header/coponents/burger_button/page";
import {useState} from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <div className={styles.logo}>
                        <span className={styles.moon}>MAH</span>
                        <span className={styles.face}>rokh</span>
                    </div>
                    <div className={styles.wrapper}>
                        <Menu isOpen={isOpen}/>
                        <Theme/>
                        <BurgerButton isOpen={isOpen}/>
                    </div>
                </nav>
            </header>
    );
}
