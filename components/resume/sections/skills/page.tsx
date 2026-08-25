import SectionTitle from "@/components/resume/sections/components/section_title/page";
import data from "@/data/db.json";
import {LuCodeXml} from "react-icons/lu";
import SkillsList from "@/components/resume/sections/skills/components/skills_list/page";

function SkillsSection() {
    const {resume: {menuItems: {skills: {hard, focus}}}} = data;

  return (
      <section>
          <SectionTitle text="SKILLS" icon={LuCodeXml} />
          <div className="flex gap-[8mm]">
              <SkillsList title='Technical' data={hard} />
              <SkillsList title='Focus' data={focus} />
          </div>
      </section>
  );
}

export default SkillsSection;
