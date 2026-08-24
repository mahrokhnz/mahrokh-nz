import Link from "next/link";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import LabsTags from "@/app/labs/_components/labs_tags/page";
import {getExperimentDescription, getExperimentHref, getExperimentTags, getLabsCategories} from "@/app/labs/_lib/data";
import cls from "@/utils/class_names";

function HomeLabsCard({
    title,
    description,
    tags,
    href,
}: {
    title: string;
    description: string;
    tags: string[];
    href: string;
}) {
    return (
        <Link
            href={href}
            className={cls(
                "group flex flex-col gap-4 rounded-2xl border border-[rgba(139,139,255,0.14)] bg-[#0c0c12] p-5",
                "transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(139,139,255,0.28)] hover:bg-[#111118]"
            )}
        >
            <h3 className="text-[1.05rem] font-semibold leading-snug text-white">{title}</h3>
            <p className="line-clamp-3 text-[0.9rem] leading-relaxed text-[#7a7a88]">{description}</p>
            <LabsTags tags={tags} className="justify-start" />
            <span className="mt-auto text-sm font-medium text-[#8b8bff] transition-opacity group-hover:opacity-80">
                Try it →
            </span>
        </Link>
    );
}

function HomeLabs() {
    const categories = getLabsCategories();

    const featured = categories
        .flatMap((category) =>
            category.experiments
                .filter((e) => "status" in e && e.status === "live")
                .map((experiment) => ({
                    title: experiment.title,
                    description: getExperimentDescription(experiment),
                    tags: getExperimentTags(experiment).slice(0, 3),
                    href: getExperimentHref(category.id, experiment),
                }))
        )
        .slice(-3)
        .reverse();

    return (
        <section aria-labelledby="home-labs-heading" className="home-labs">
            <Container className="min-h-0 !bg-[#050508]">
                <SectionTitle
                    as="h2"
                    id="home-labs-heading"
                    text="Mahrokh Labs"
                    className="!text-white"
                />
                <p className="-mt-10 mb-12 text-center text-base leading-relaxed text-[#7a7a88] max-tablet:-mt-8 max-tablet:mb-10 max-phone:-mt-4 max-phone:mb-8 max-phone:text-sm">
                    Interactive experiments, tools and frontend engineering playgrounds.
                </p>

                <div className="grid grid-cols-3 gap-5 max-small-desktop:grid-cols-2 max-tablet:grid-cols-1">
                    {featured.map((lab) => (
                        <HomeLabsCard
                            key={lab.href}
                            title={lab.title}
                            description={lab.description}
                            tags={lab.tags}
                            href={lab.href}
                        />
                    ))}
                </div>

                <div className="mt-12 flex justify-center max-phone:mt-8">
                    <Link
                        href="/labs"
                        className="inline-flex items-center gap-1.5 text-base font-medium text-[#8b8bff] transition-opacity duration-300 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b8bff]"
                    >
                        Explore Labs →
                    </Link>
                </div>
            </Container>
        </section>
    );
}

export default HomeLabs;
