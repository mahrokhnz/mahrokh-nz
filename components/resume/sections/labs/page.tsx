import SectionTitle from "@/components/resume/sections/components/section_title/page";
import data from "@/data/db.json";
import {LuFlaskConical} from "react-icons/lu";

function LabsSection() {
    const {resume: {menuItems: {labs}}} = data;

    return (
        <section>
            <SectionTitle
                text="LABS"
                icon={LuFlaskConical}
                lead="Interactive experiments that show how deeply I understand frontend."
            />
            <div className="flex flex-col gap-[3mm]">
                {labs.items.map((lab) => (
                    <div key={lab.id} className="flex flex-col gap-[0.8mm]">
                        <h4 className="text-[4.5mm] font-semibold">{lab.title}</h4>
                        <p className="text-[3.8mm] leading-[1.28]">{lab.description}</p>
                    </div>
                ))}
            </div>
            <a
                className="mt-[3mm] inline-block text-[4mm] font-semibold text-(--linkColor)"
                href={labs.url}
                target="_blank"
                rel="noreferrer"
            >
                See more → {labs.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
        </section>
    );
}

export default LabsSection;
