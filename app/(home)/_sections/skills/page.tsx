import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import SkillsLists from "@/app/(home)/_sections/skills/components/skills_lists/page";

function Skills() {
  return (
          <section>
              <Container>
                  <SectionTitle text='My Skills' />
                  <SkillsLists />
              </Container>
          </section>
  );
}

export default Skills;
