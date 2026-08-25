import {LuClipboardList} from "react-icons/lu";
import SectionTitle from "@/components/resume/sections/components/section_title/page";
import data from "@/data/db.json";

function SummarySection() {
    const {resume: {menuItems: {stack}}} = data;

    return (
        <section>
            <SectionTitle text="SUMMARY" icon={LuClipboardList}/>
            <p className="text-[4.2mm] leading-[1.3]">
                Frontend Developer with 6+ years of experience building web applications
                and interactive experiences. I specialize in React, Next.js and TypeScript,
                with a focus on frontend architecture, performance and high-quality UI.
            </p>
            <p className="mt-[2mm] text-[3.6mm] leading-[1.3]">{stack.join(" · ")}</p>
        </section>
    );
}

export default SummarySection;
