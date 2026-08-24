import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import SkillsLists from "./components/skills_lists/page";

function Skills() {
  return (
          <section>
              <Container>
                  <SectionTitle text='Technical Expertise' />
                  <SkillsLists />
              </Container>
          </section>
  );
}

export default Skills;
