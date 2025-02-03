"use client"

import styles from "./page.module.sass";
import cls from "@/utils/class_names";
import React from "react";
import {useTheme} from "@/context/theme_context";

export default function Theme() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.theme} onClick={toggleTheme}>
            {/*<i style={{color: 'red', fill: 'red', fontSize: '14px'}} className={cls('icon', theme === 'light' ? 'moon-over-sun-regular' : 'moon-regular')}></i>*/}
            <i style={{color: 'red', fill: 'red', fontSize: '14px'}} className="icon moon-over-sun-regular"></i>
        </div>
    );
}
