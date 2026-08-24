import SectionTitle from "@/components/resume/sections/components/section_title/page";
import data from "@/data/db.json";
import {LuGlobe} from "react-icons/lu";

function PortfolioSection() {
    const {resume: {menuItems: {portfolio}}} = data;

    return (
        <section>
            <SectionTitle
                text="PORTFOLIO"
                icon={LuGlobe}
                lead="The live site lets you interact with the work."
            />
            <p className="text-[4mm] leading-[1.3]">{portfolio.text}</p>
            <a
                className="mt-[1.5mm] inline-block text-[4.2mm] font-semibold text-(--linkColor)"
                href={portfolio.url}
                target="_blank"
                rel="noreferrer"
            >
                {portfolio.label}
            </a>
        </section>
    );
}

export default PortfolioSection;
