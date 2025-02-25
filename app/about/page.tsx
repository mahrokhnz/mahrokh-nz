import type {Metadata} from "next";
import metadataCreator from "@/utils/metadata";
import AboutMe from "@/app/about/_sections/(about)/page";
import Education from "@/app/about/_sections/(education)/page";

export const metadata: Metadata = metadataCreator('About', 'About me' )

function About() {
    return (
        <main>
            <AboutMe></AboutMe>
            <Education></Education>
        </main>
    );
}

export default About
