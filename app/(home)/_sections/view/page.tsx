import styles from "./page.module.sass";
import SvgPath from "@/components/svg_path/page";
import Contact from "@/components/contact/page";
import Container from "@/components/container/page";
import DownloadButton from "@/components/download_button/page";
import React from "react";
import LazyCanvasWrapper from "@/components/constellation/lazy_canvas_wrapper";

function View() {
  return (
      <section className={styles.view}>
          <Container>
              <div className={styles.nameWrapper}>
                  <h1>I&#39;m Mahrokh Nabizadeh.</h1>
                  <h2>Frontend Developer</h2>
                  <Contact/>

                  <DownloadButton className={styles.downloadButton} />
              </div>
              <LazyCanvasWrapper />
              <SvgPath/>
          </Container>
      </section>
  );
}

export default View
