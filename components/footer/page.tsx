import Menu from "@/components/menu/page";
import Contact from "@/components/contact/page";

function Footer() {
    const date: Date = new Date();
    const year: number = date.getFullYear();

    return (
        <footer className="flex flex-col justify-center gap-8 bg-(--firstWaveColor) px-24 py-8 h-auto max-tablet:gap-[1.3rem] max-tablet:p-8 max-phone:p-[1.1rem]">
            <div className="flex flex-col items-center gap-8 max-tablet:gap-[1.3rem]">
                <Menu isFooter={true} />
                <Contact isFooter={true} />
            </div>
            <div className="h-[0.1rem] bg-(--neutralColor) opacity-50" />
            <span className="self-center text-[0.8rem]">
                © {year} MAHrokh Tehran, Iran. All rights reserved.
            </span>
        </footer>
    );
}

export default Footer
