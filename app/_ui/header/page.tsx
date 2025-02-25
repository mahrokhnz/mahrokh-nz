"use client"

import styles from "./page.module.sass";
import Menu from "@/app/_ui/menu/page";
import Theme from "@/app/_ui/header/components/theme/page";
import BurgerButton from "@/app/_ui/header/components/burger_button/page";
import {useState} from "react";
import Link from "next/link";

function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <Link href="/">
                        <div className={styles.logo}>
                            <span className={styles.moon}>MAH</span>
                            <span className={styles.face}>rokh</span>
                        </div>
                    </Link>
                    <div className={styles.wrapper}>
                        <Menu isOpen={isOpen} />
                        <Theme/>
                        <BurgerButton isOpen={isOpen} onClickHandler={() => setIsOpen(!isOpen)} />
                    </div>
                </nav>
            </header>
    );
}

export default Header
