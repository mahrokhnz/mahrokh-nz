import {Suspense} from "react";
import Link from "next/link";
import Container from "@/components/container/page";
import Button from "@/components/Button/page";
import ArrowLink from "../../_components/arrow_link/page";
import {HomeCtaSkeleton} from "@/components/skeleton/page";

async function FinalCtaContent() {
    return (
        <section aria-labelledby="home-cta-heading" className="pb-8">
            <Container className="min-h-0">
                <div className="relative mx-auto flex max-w-[640px] flex-col items-center gap-6 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--firstWaveColor)_18%,transparent)] bg-[color-mix(in_srgb,var(--primaryColor)_50%,transparent)] px-8 py-12 text-center shadow-[0_8px_32px_color-mix(in_srgb,var(--firstWaveColor)_12%,transparent)] backdrop-blur-md transition-all duration-300 hover:border-[color-mix(in_srgb,var(--firstWaveColor)_32%,transparent)] hover:shadow-[0_14px_40px_color-mix(in_srgb,var(--firstWaveColor)_18%,transparent)] max-phone:px-6 max-phone:py-10">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-16 left-1/2 size-56 -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--firstWaveColor)_18%,transparent)] blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--firstWaveColor)_45%,transparent)] to-transparent"
                    />
                    <h2
                        id="home-cta-heading"
                        className="relative z-[1] text-[clamp(1.5rem,3vw,2rem)] leading-[1.3] text-(--textColor)"
                    >
                        Have an interesting project in mind?
                    </h2>
                    <p className="relative z-[1] text-base leading-[1.7] text-(--neutralColor)">
                        I&apos;m always interested in working on thoughtful products, frontend challenges and
                        interactive experiences.
                    </p>
                    <div className="relative z-[1] flex flex-wrap items-center justify-center gap-4 pt-2">
                        <Link href="/contact">
                            <Button>Let&apos;s talk →</Button>
                        </Link>
                        <ArrowLink href="/projects">View my work →</ArrowLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function FinalCta() {
    return (
        <Suspense fallback={<HomeCtaSkeleton />}>
            <FinalCtaContent />
        </Suspense>
    );
}

export default FinalCta;
