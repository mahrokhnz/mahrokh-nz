import data from "@/data/db.json";
import EducationItem from "@/components/resume/sections/education/components/education_item/page";
import Language from "@/components/resume/sections/Languages/components/language/page";

function SupportingSection() {
    const {
        resume: {
            menuItems: {
                educations,
                languages,
                skills: {hard, soft},
            },
        },
    } = data;

    return (
        <section className="mt-auto flex flex-col gap-[4mm] border-t-[0.5mm] border-(--lineColor) pt-[4mm]">
            <div className="flex gap-[8mm]">
                <div className="flex-1">
                    <h3 className="mb-[2.5mm] text-[4.4mm] font-semibold">EDUCATION</h3>
                    <div className="flex flex-col gap-[3mm]">
                        {educations.map((education) => (
                            <EducationItem key={education.id} item={education} />
                        ))}
                    </div>
                </div>
                <div className="w-[58mm]">
                    <h3 className="mb-[2.5mm] text-[4.4mm] font-semibold">LANGUAGES</h3>
                    <div className="flex flex-col gap-[3mm]">
                        {languages.map((language) => (
                            <Language key={language.id} item={language} />
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h3 className="mb-[1.5mm] text-[4.4mm] font-semibold">SKILLS</h3>
                <p className="text-[3.6mm] leading-[1.35]">{hard.map((skill) => skill.title).join(" · ")}</p>
                <p className="mt-[1mm] text-[3.6mm] leading-[1.35]">{soft.map((skill) => skill.title).join(" · ")}</p>
            </div>
        </section>
    );
}

export default SupportingSection;
