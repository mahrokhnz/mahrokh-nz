import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import JsonLdScript from "@/components/seo/jsonld_script";
import {getWebPageJsonLd} from "@/utils/seo/jsonld";

const PROJECTS_DESCRIPTION =
    "Explore the projects of MAHrokh, an experienced Front-End Developer. Discover innovative web development work in HTML, CSS, JavaScript, React, and Next.js.";

export const metadata: Metadata = metadataCreator({
    title: "Projects",
    description: PROJECTS_DESCRIPTION,
    path: "/projects",
});

interface ProjectsLayoutProps {
    children: React.ReactNode;
}

function ProjectsLayout({children}: ProjectsLayoutProps) {
    return (
        <>
            <JsonLdScript
                id="ld-projects"
                data={getWebPageJsonLd({
                    title: "Projects",
                    description: PROJECTS_DESCRIPTION,
                    path: "/projects",
                })}
            />
            {children}
        </>
    );
}

export default ProjectsLayout;
