import SectionTitle from "@/components/resume/sections/components/section_title/page";
import data from "@/data/db.json";
import Experience from "@/components/resume/sections/work_experiences/components/experience/page";
import {RiSuitcaseLine} from "react-icons/ri";

function WorkExperiencesSection() {
    const {resume: {menuItems: {experiences}}} = data;

    return (
        <section>
            <SectionTitle
                text="EXPERIENCE"
                icon={RiSuitcaseLine}
                lead="Product work that proves I ship frontend applications."
            />
            <div
                className="relative flex flex-col gap-[5mm] before:absolute before:left-[36.5mm] before:z-[-1] before:h-full before:w-[0.5mm] before:bg-(--lineColor) before:content-['']">
                {experiences.map((experience) => (
                    <Experience key={experience.id} item={experience}/>
                ))}
            </div>
        </section>
    );
}

export default WorkExperiencesSection;
