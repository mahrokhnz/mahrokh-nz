import Container from "@/app/_ui/container/page";
import SectionTitle from "@/app/_ui/section_title/page";
import SkillsLists from "@/app/(home)/_sections/(skills)/components/skills_lists/page";

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
