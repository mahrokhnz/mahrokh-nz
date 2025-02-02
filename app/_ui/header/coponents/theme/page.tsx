"use client"

import styles from "./page.module.sass";
import cls from "@/utils/class_names";
import React from "react";

export default function Theme() {
    const [theme, setTheme] = React.useState<string>("light");

    const changeThemeHandler = () => {
        if (theme === 'light') {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    return (
        <div className={styles.theme}>
            <i className={cls(`icon, ${theme === 'light' ? 'moon-over-sun-light' : 'moon-light'}`)} onClick={changeThemeHandler}></i>
        </div>
    );
}
