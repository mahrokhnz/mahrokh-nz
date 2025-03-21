import styles from "./page.module.sass";
import Canvas from "@/app/_ui/constellation/page";
import SvgPath from "@/app/_ui/svg_path/page";
import Contact from "@/app/_ui/contact/page";
import Container from "@/app/_ui/container/page";
import DownloadButton from "@/app/_ui/download_button/page";
import React from "react";

function View() {
  return (
      <section className={styles.view}>
          <Container>
              <Canvas/>
              <div className={styles.nameWrapper}>
                  <h1>I&#39;m Mahrokh Nabizadeh.</h1>
                  <h2>Frontend Developer</h2>
                  <Contact/>

                  <DownloadButton className={styles.downloadButton} />
              </div>
              <SvgPath/>
          </Container>
      </section>
  );
}

export default View
