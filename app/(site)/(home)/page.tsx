import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import View from "@/app/(site)/(home)/_sections/view/page";
import SelectedWork from "@/app/(site)/(home)/_sections/selected_work/page";
import HomeLabs from "@/app/(site)/(home)/_sections/labs/page";
import Skills from "@/app/(site)/(home)/_sections/skills/page";
import HomeAbout from "@/app/(site)/(home)/_sections/about/page";
import FinalCta from "@/app/(site)/(home)/_sections/final_cta/page";
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
            <SelectedWork />
            <HomeLabs />
            <Skills />
            <HomeAbout />
            <FinalCta />
        </main>
    );
}

export default Home;
