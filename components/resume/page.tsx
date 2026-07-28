import SummarySection from "@/components/resume/sections/summary/page";
import Header from "@/components/resume/sections/components/header/page";
import WorkExperiencesSection from "@/components/resume/sections/work_experiences/page";
import EducationSection from "@/components/resume/sections/education/page";
import SkillsSection from "@/components/resume/sections/skills/page";
import LanguagesSection from "@/components/resume/sections/Languages/page";

function Resume() {
  return (
      <div className="z-[-1] flex flex-col">
        <div className="relative z-0 ml-[20mm] flex h-[297mm] w-[210mm] flex-col gap-[10mm] bg-(--whiteColor) px-[20mm] py-[15mm] font-[cormorantGaramondMedium,serif] text-black [page-break-after:always] after:absolute after:top-0 after:left-[-20mm] after:z-[-1] after:h-full after:w-[33mm] after:bg-(--darkColor) after:content-['']">
            <Header />
            <SummarySection />
            <WorkExperiencesSection />
        </div>
        <div className="relative z-0 ml-[20mm] flex h-[297mm] w-[210mm] flex-col gap-[10mm] bg-(--whiteColor) px-[20mm] py-[15mm] font-[cormorantGaramondMedium,serif] text-black [page-break-after:always] after:absolute after:top-0 after:left-[-20mm] after:z-[-1] after:h-full after:w-[33mm] after:bg-(--darkColor) after:content-['']">
            <EducationSection />
            <SkillsSection />
            <LanguagesSection />
        </div>
      </div>
  );
}

export default Resume;
