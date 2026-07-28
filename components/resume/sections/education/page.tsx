import SectionTitle from "@/components/resume/sections/components/section_title/page";
import {FaGraduationCap} from "react-icons/fa6";
import data from "@/data/db.json";
import EducationItem from "@/components/resume/sections/education/components/education_item/page";

function EducationSection() {
    const {resume: {menuItems: {educations}}} = data;

  return (
      <section>
          <SectionTitle text='EDUCATION' icon={FaGraduationCap} />
          <div className="flex gap-[8mm]">
              {educations.map((education) => (
                  <EducationItem key={education.id} item={education} />
              ))}
          </div>
      </section>
  );
}

export default EducationSection;
