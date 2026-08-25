import SectionTitle from "@/components/resume/sections/components/section_title/page";
import data from "@/data/db.json";
import {LuLayers} from "react-icons/lu";

function ProjectsSection() {
    const {resume: {menuItems: {projects}}} = data;

    return (
        <section>
            <SectionTitle
                text="PROJECTS"
                icon={LuLayers}
            />
            <div className="flex flex-col gap-[3.5mm]">
                {projects.map((project) => (
                    <div key={project.id} className="flex flex-col gap-[1mm]">
                        <div className="flex items-baseline justify-between gap-[4mm]">
                            <h4 className="text-[4.6mm] font-semibold">{project.title}</h4>
                            <a
                                className="text-[3.4mm] font-semibold text-(--linkColor)"
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                            </a>
                        </div>
                        <p className="text-[3.8mm] leading-[1.28]">{project.description}</p>
                        <p className="text-[3.5mm] leading-[1.25]">{project.skills.join(" · ")}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProjectsSection;
