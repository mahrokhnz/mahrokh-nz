import styles from "./page.module.sass";
import cls from "@/utils/class_names";
import Canvas from "@/app/_ui/constellation/page";
import SvgPath from "@/app/_ui/svg_path/page";
import type {Metadata} from "next";

// TODO: add in every page
export const metadata: Metadata = {
    title: "MAHrokh | Home",
    description: "This is my personal website that generated with Next js",
};

export default function Home() {
  return (
      <section className={styles.home}>
          {/*<contact-component></contact-component>*/}
          <div className={styles.nameWrapper}>
              <h1>I&#39;m Mahrokh Nabizadeh.</h1>
              <h2>Frontend Developer</h2>
          </div>

          <SvgPath />
          <Canvas />
      </section>
  );
}
