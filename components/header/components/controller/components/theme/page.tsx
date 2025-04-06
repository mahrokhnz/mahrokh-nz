import styles from "./page.module.sass";
import React from "react";
import {useTheme} from "@/context/theme_context";
import { LuSunMoon } from "react-icons/lu"
import { IoMoonOutline } from "react-icons/io5";

function Theme() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.theme} onClick={toggleTheme}>
            {theme === 'light' ? (
                <LuSunMoon className={styles.themeIcon} />
            ) : (
                <IoMoonOutline className={styles.themeIcon} />
            )}
        </div>
    );
}

export default Theme
