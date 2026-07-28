import Link from "next/link";
import Controller from "@/components/header/components/controller/page";

function Header() {
    return (
        <header className="fixed z-[1000] w-full bg-(--primaryColor) px-24 py-8 max-tablet:p-8 max-phone:p-[1.1rem]">
            <nav className="flex items-center justify-between">
                <Link href="/">
                    <div className="flex items-center">
                        <span className="text-[3rem] text-(--textColor) max-phone:text-[2.5rem]">MAH</span>
                        <span className="text-[2rem] text-(--neutralColor) max-phone:text-[1.5rem]">rokh</span>
                    </div>
                </Link>
                <Controller />
            </nav>
        </header>
    );
}

export default Header
