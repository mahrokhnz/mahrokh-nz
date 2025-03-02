import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import View from "@/app/(home)/_sections/(view)/page";
import Skills from "@/app/(home)/_sections/(skills)/page";

export const metadata: Metadata = metadataCreator('Home', 'Discover the portfolio of MAHrokh, an innovative Front-End Developer. Specializing in HTML, CSS, JavaScript, React, and Next.js, I create dynamic, user-friendly websites. Explore my projects, skills, and experience to see how I can bring your vision to life.' )

function Home() {
  return (
      <main>
          <View></View>
          <Skills></Skills>
      </main>
  );
}

export default Home
