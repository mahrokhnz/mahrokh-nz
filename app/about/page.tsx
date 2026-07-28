import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import AboutMe from "@/app/about/_sections/about/page";
import Education from "@/app/about/_sections/education/page";
import JsonLdScript from "@/components/seo/jsonld_script";
import {getWebPageJsonLd} from "@/utils/seo/jsonld";

const ABOUT_DESCRIPTION =
    "Discover MAHrokh's journey as a Front-End Developer. Passionate about HTML, CSS, JavaScript, React, and Next.js. Explore skills, projects, and experience.";

export const metadata: Metadata = metadataCreator({
    title: "About",
    description: ABOUT_DESCRIPTION,
    path: "/about",
});

function About() {
    return (
        <main>
            <JsonLdScript
                id="ld-about"
                data={getWebPageJsonLd({
                    title: "About",
                    description: ABOUT_DESCRIPTION,
                    path: "/about",
                })}
            />
            <AboutMe />
            <Education />
        </main>
    );
}

export default About;
