"use client"

import styles from "./page.module.sass";
import Menu from "@/components/menu/page";
import Theme from "@/components/header/components/controller/components/theme/page";
import BurgerButton from "@/components/header/components/controller/components/burger_button/page";
import {useState} from "react";

function Controller() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={styles.wrapper}>
            <Menu isOpen={isOpen} />
            <Theme/>
            <BurgerButton isOpen={isOpen} onClickHandler={() => setIsOpen(!isOpen)} />
        </div>
    );
}

export default Controller
