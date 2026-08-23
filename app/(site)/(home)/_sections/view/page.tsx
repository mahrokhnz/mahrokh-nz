import Contact from "@/components/contact/page";
import Container from "@/components/container/page";
import DownloadButton from "@/components/download_button/page";
import React from "react";
import LazyCanvasWrapper from "@/components/constellation/lazy_canvas_wrapper";
import LazySvg from "@/components/svg_path/lazy_svg_path";

function View() {
  return (
      <section className="relative flex h-screen flex-col gap-32 pt-[100px] max-tablet:h-auto max-tablet:min-h-0 max-tablet:gap-16 max-phone:items-center">
          <Container className="relative max-tablet:min-h-0">
              <div className="z-[1] flex flex-col gap-12 max-tablet:gap-8 max-phone:items-center max-phone:text-center">
                  <h1 className="text-[4rem] leading-[1.2] text-(--textColor) max-tablet:text-[2rem]">I&#39;m Mahrokh Nabizadeh.</h1>
                  <h2 className="text-[2rem] text-(--neutralColor) max-tablet:text-[1.5rem]">Frontend Developer</h2>
                  <Contact/>

                  <DownloadButton className="self-start max-phone:self-center" />
              </div>
              <LazyCanvasWrapper />
              <LazySvg/>
          </Container>
      </section>
  );
}

export default View
