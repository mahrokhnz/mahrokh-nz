import data from "@/data/db.json";
import EducationItem from "@/components/resume/sections/education/components/education_item/page";
import Language from "@/components/resume/sections/Languages/components/language/page";
import {LuGlobe} from "react-icons/lu";
import SectionTitle from "@/components/resume/sections/components/section_title/page";

function SupportingSection() {
    const {
        resume: {
            menuItems: {
                educations,
                languages,
                skills: {hard, focus},
            },
        },
    } = data;

    return (
        <section>
            <SectionTitle
                text="PORTFOLIO"
                icon={LuGlobe}
            />
            <div className="flex gap-[8mm]">
                <div className="flex-1">
                    <h3 className="mb-[3mm] text-[4.4mm] font-semibold">EDUCATION</h3>
                    <div className="flex flex-col gap-[3mm]">
                        {educations.map((education) => (
                            <EducationItem key={education.id} item={education}/>
                        ))}
                    </div>
                </div>
                <div className="w-[58mm]">
                    <h3 className="mb-[2.5mm] text-[4.4mm] font-semibold">LANGUAGES</h3>
                    <div className="flex flex-col gap-[3mm]">
                        {languages.map((language) => (
                            <Language key={language.id} item={language}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-[5mm]'>
                <h3 className="mb-[3mm] text-[4.4mm] font-semibold">SKILLS</h3>
                <p className="text-[3.6mm] leading-[1.35]">{hard.map((skill) => skill.title).join(" · ")}</p>
                <p className="mt-[1mm] text-[3.6mm] leading-[1.35]">{focus.map((skill) => skill.title).join(" · ")}</p>
            </div>
        </section>
    );
}

export default SupportingSection;
