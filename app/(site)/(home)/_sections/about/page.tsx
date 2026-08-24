import {Suspense} from "react";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import ArrowLink from "../../_components/arrow_link/page";
import {HomeAboutSkeleton} from "@/components/skeleton/page";

async function HomeAboutContent() {
    return (
        <section>
            <Container className="min-h-0">
                <SectionTitle text="A bit about me" />
                <div className="mx-auto flex max-w-[640px] flex-col gap-6 text-center">
                    <p className="text-base leading-[1.8] text-(--neutralColor)">
                        I&apos;m a frontend developer who has been building web applications and interactive
                        experiences since 2021.
                    </p>
                    <p className="text-base leading-[1.8] text-(--neutralColor)">
                        I enjoy turning ideas into fast, thoughtful and maintainable interfaces, with a focus on
                        React, Next.js, TypeScript, frontend architecture and performance.
                    </p>
                    <div className="pt-2">
                        <ArrowLink href="/about">More about me →</ArrowLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function HomeAbout() {
    return (
        <Suspense fallback={<HomeAboutSkeleton />}>
            <HomeAboutContent />
        </Suspense>
    );
}

export default HomeAbout;
