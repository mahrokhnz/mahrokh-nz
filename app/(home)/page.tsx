import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import View from "@/app/(home)/_sections/view/page";
import Skills from "@/app/(home)/_sections/skills/page";
import JsonLdScript from "@/components/seo/jsonld_script";
import {getPersonJsonLd, getWebsiteJsonLd} from "@/utils/seo/jsonld";

const HOME_DESCRIPTION =
    "Explore MAHrokh's portfolio, a skilled Front-End Developer specializing in HTML, CSS, JavaScript, React, and Next.js. Discover projects, skills, and experience!";

export const metadata: Metadata = metadataCreator({
    title: "Home",
    description: HOME_DESCRIPTION,
    path: "/",
});

function Home() {
    return (
        <main>
            <JsonLdScript id="ld-website" data={getWebsiteJsonLd()} />
            <JsonLdScript id="ld-person" data={getPersonJsonLd()} />
            <View />
            <Skills />
        </main>
    );
}

export default Home;
