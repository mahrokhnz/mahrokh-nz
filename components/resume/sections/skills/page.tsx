import SectionTitle from "@/components/resume/sections/components/section_title/page";
import data from "@/data/db.json";
import {LuPencilOff} from "react-icons/lu";
import SkillsList from "@/components/resume/sections/skills/components/skills_list/page";

function SkillsSection() {
    const {resume: {menuItems: {skills: {hard, soft}}}} = data;

  return (
      <section>
          <SectionTitle text='SKILLS' icon={LuPencilOff} />
          <div className="flex gap-[8mm]">
              <SkillsList title='Hard Skills' data={hard} />
              <SkillsList title='Soft Skills' data={soft} />
          </div>
      </section>
  );
}

export default SkillsSection;
