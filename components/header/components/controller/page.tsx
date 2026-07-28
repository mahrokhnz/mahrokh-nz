"use client"

import Menu from "@/components/menu/page";
import Theme from "@/components/header/components/controller/components/theme/page";
import BurgerButton from "@/components/header/components/controller/components/burger_button/page";
import {useState} from "react";
import {usePathname} from "next/navigation";

function Controller() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const isLabs = pathname?.startsWith("/labs");

    return (
        <div className="flex items-center gap-8 max-phone:gap-[0.8rem]">
            <Menu isOpen={isOpen} onItemClick={() => setIsOpen(false)} />
            {!isLabs && <Theme />}
            <BurgerButton isOpen={isOpen} onClickHandler={() => setIsOpen(!isOpen)} />
        </div>
    );
}

export default Controller
