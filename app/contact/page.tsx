import type {Metadata} from "next";
import Container from "@/components/container/page";
import {MdEmail} from "react-icons/md";
import * as React from "react";
import SectionTitle from "@/components/section_title/page";
import Form from "@/app/contact/_components/form/page";
import metadataCreator from "@/utils/server-metadata";
import JsonLdScript from "@/components/seo/jsonld_script";
import {getWebPageJsonLd} from "@/utils/seo/jsonld";
import LazyCanvasWrapper from "@/components/constellation/lazy_canvas_wrapper";

const CONTACT_DESCRIPTION =
    "Get in touch with MAHrokh, a skilled Front-End Developer. Contact me for inquiries about projects, collaborations, or any questions regarding web development.";

export const metadata: Metadata = metadataCreator({
    title: "Contact",
    description: CONTACT_DESCRIPTION,
    path: "/contact",
});

function ContactMe() {
    return (
        <main>
            <JsonLdScript
                id="ld-contact"
                data={getWebPageJsonLd({
                    title: "Contact",
                    description: CONTACT_DESCRIPTION,
                    path: "/contact",
                })}
            />
            <LazyCanvasWrapper onlyStarts />
            <section className="pt-[100px]">
                <Container className="bg-(--secondaryColor)">
                    <div className="flex justify-between gap-5 max-medium-desktop:gap-5 max-small-desktop:flex-col max-small-desktop:gap-[50px]">
                        <div className="z-[1] flex max-w-[500px] flex-col self-center max-medium-desktop:max-w-[400px] max-small-desktop:max-w-none">
                            <SectionTitle text="Contact Me" alignment="flex-start" className="mb-12 max-medium-desktop:mb-8 max-phone:mb-6" />
                            <p className="text-[20px] leading-[1.2] max-medium-desktop:text-[15px]">
                                Feel free to reach out to me for any inquiries, collaborations, or just to say hi! Whether you have a question, a project idea, or simply want to connect, I&#39;m always eager to hear from you.
                            </p>
                            <div className="mt-20 flex items-center gap-[15px] max-medium-desktop:mt-[50px] max-small-desktop:mt-5">
                                <MdEmail className="text-[25px]" />
                                <a href="mailto:mahrokh.nz@gmail.com">Mahrokh.nz@gmail.com</a>
                            </div>
                        </div>
                        <Form />
                    </div>
                </Container>
            </section>
        </main>
    );
}

export default ContactMe;
