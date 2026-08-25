import SummarySection from "@/components/resume/sections/summary/page";
import Header from "@/components/resume/sections/components/header/page";
import WorkExperiencesSection from "@/components/resume/sections/work_experiences/page";
import ProjectsSection from "@/components/resume/sections/projects/page";
import LabsSection from "@/components/resume/sections/labs/page";
import SkillsSection from "@/components/resume/sections/skills/page";
import EducationSection from "@/components/resume/sections/education/page";
import LanguagesSection from "@/components/resume/sections/Languages/page";
import {ReactNode} from "react";

function ResumePage({children}: { children: ReactNode }) {
    return (
        <div
            data-resume-page
            className="relative w-[210mm] overflow-hidden bg-(--whiteColor) font-[cormorantGaramondMedium,serif] [page-break-after:always]"
            style={{color: "#111111"}}
        >
            <div className="absolute inset-y-0 left-0 z-0 w-[33mm] bg-(--darkColor)"/>
            <div className="relative z-[1] flex h-full flex-col gap-[6mm] pl-[40mm] pr-[20mm] py-[12mm]">
                {children}
            </div>
        </div>
    );
}

function Resume() {
    return (
        <div className="flex flex-col">
            <ResumePage>
                <Header/>
                <SummarySection/>
                <WorkExperiencesSection/>
            </ResumePage>
            <ResumePage>
                <ProjectsSection/>
                <LabsSection/>
                <SkillsSection/>
                <EducationSection/>
                <LanguagesSection/>
            </ResumePage>
        </div>
    );
}

export default Resume;
