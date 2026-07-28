import {LuClipboardList} from "react-icons/lu";
import SectionTitle from "@/components/resume/sections/components/section_title/page";

function SummarySection() {
  return (
      <section>
          <SectionTitle text='SUMMARY' icon={LuClipboardList} />
          <p className="text-[4.5mm] leading-[1.2]">
              A Frontend Developer that work from 2021 with a passion for building efficient, user-centric and responsive web
              applications. I focus on creating high-quality, performance-driven solutions. I’m continuously improving
              my skills and exploring new technologies.
          </p>
      </section>
  );
}

export default SummarySection;
