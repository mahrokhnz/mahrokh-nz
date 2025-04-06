import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import View from "@/app/(home)/_sections/view/page";
import Skills from "@/app/(home)/_sections/skills/page";

export const metadata: Metadata = metadataCreator('Home', 'Explore MAHrokh\'s portfolio, a skilled Front-End Developer specializing in HTML, CSS, JavaScript, React, and Next.js.Discover projects, skills, and experience!')

function Home() {
  return (
      <main>
          <View></View>
          <Skills></Skills>
      </main>
  );
}

export default Home
