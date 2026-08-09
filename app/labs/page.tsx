import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import JsonLdScript from "@/components/seo/jsonld_script";
import {getWebPageJsonLd} from "@/utils/seo/jsonld";
import LabsShell from "@/app/labs/_components/labs_shell/page";
import LabsHero from "@/app/labs/_sections/hero/page";
import LabsCategories from "@/app/labs/_sections/categories/page";
import {LABS_DESCRIPTION, LABS_PATH} from "@/app/labs/seo/constants";

export const metadata: Metadata = metadataCreator({
    title: "Labs",
    description: LABS_DESCRIPTION,
    path: LABS_PATH,
});

function Labs() {
    return (
        <LabsShell>
            <JsonLdScript
                id="ld-labs"
                data={getWebPageJsonLd({
                    title: "Labs",
                    description: LABS_DESCRIPTION,
                    path: LABS_PATH,
                })}
            />
            <LabsHero />
            <LabsCategories />
        </LabsShell>
    );
}

export default Labs;
