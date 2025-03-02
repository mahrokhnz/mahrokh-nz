import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import AboutMe from "@/app/about/_sections/(about)/page";
import Education from "@/app/about/_sections/(education)/page";

export const metadata: Metadata = metadataCreator('About', 'I\'m MAHrokh, an enthusiastic and passionate Front-End Developer with a knack for creating visually appealing and user-friendly websites. I specialize in HTML, CSS, JavaScript, React, and Next.js, transforming ideas into reality with clean, efficient code.' )

function About() {
    return (
        <main>
            <AboutMe></AboutMe>
            <Education></Education>
        </main>
    );
}

export default About
