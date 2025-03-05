import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import AboutMe from "@/app/about/_sections/(about)/page";
import Education from "@/app/about/_sections/(education)/page";

export const metadata: Metadata = metadataCreator('About', 'Discover MAHrokh\'s journey as a Front-End Developer. Passionate about HTML, CSS, JavaScript, React, and Next.js.Explore skills, projects, and experience.' )

function About() {
    return (
        <main>
            <AboutMe></AboutMe>
            <Education></Education>
        </main>
    );
}

export default About
