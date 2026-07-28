import React from "react";
import {useTheme} from "@/context/theme_context";
import { LuSunMoon } from "react-icons/lu"
import { IoMoonOutline } from "react-icons/io5";

function Theme() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="size-6 cursor-pointer" onClick={toggleTheme}>
            {theme === 'light' ? (
                <LuSunMoon className="text-2xl text-(--textColor)" />
            ) : (
                <IoMoonOutline className="text-2xl text-(--textColor)" />
            )}
        </div>
    );
}

export default Theme
