import Link from "next/link";
import data from "@/data/db.json";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import SkeletonImage from "@/components/skeleton_image/page";
import ArrowLink from "../../_components/arrow_link/page";
import cls from "@/utils/class_names";
import type {ProjectType} from "@/app/(site)/projects/type";

const FEATURED_PROJECT_IDS = [4, 7, 2];

function getFeaturedProjects(): ProjectType[] {
    return FEATURED_PROJECT_IDS.flatMap((id) => {
        const project = data.projects.find((p) => p.id === id);
        return project ? [project as ProjectType] : [];
    });
}

function HomeProjectCard({project}: {project: ProjectType}) {
    const href = project.demo ?? project.code ?? "/projects";

    return (
        <article
            className={cls(
                "group relative flex flex-col gap-0 overflow-hidden rounded-2xl",
                "border border-[color-mix(in_srgb,var(--firstWaveColor)_14%,transparent)]",
                "bg-[color-mix(in_srgb,var(--primaryColor)_55%,transparent)]",
                "shadow-[0_4px_24px_color-mix(in_srgb,var(--firstWaveColor)_10%,transparent)]",
                "backdrop-blur-md",
                "transition-all duration-300",
                "hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--firstWaveColor)_30%,transparent)]",
                "hover:shadow-[0_10px_36px_color-mix(in_srgb,var(--firstWaveColor)_18%,transparent)]"
            )}
        >
            {project.image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <SkeletonImage
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        src={project.image}
                        alt={project.title}
                        width={480}
                        height={360}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        wrapperClassName="relative size-full"
                    />
                </div>
            )}

            <div className="flex flex-col gap-3 p-4">
                <h3 className="text-base font-medium text-(--textColor)">{project.title}</h3>

                <p className="line-clamp-2 text-sm leading-relaxed text-(--neutralColor)">
                    {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    {project.skills.slice(0, 4).map((skill, index) => (
                        <span key={`${project.id}-skill-${index}`} className="flex items-center gap-x-1.5">
                            {index > 0 && (
                                <span className="text-[10px] opacity-30 text-(--neutralColor)">·</span>
                            )}
                            <span className="text-xs text-(--neutralColor)">{skill}</span>
                        </span>
                    ))}
                </div>

                <Link
                    href={href}
                    target={href !== "/projects" ? "_blank" : undefined}
                    rel={href !== "/projects" ? "noreferrer" : undefined}
                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-(--firstWaveColor) transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--firstWaveColor)"
                >
                    View project →
                </Link>
            </div>
        </article>
    );
}

function SelectedWork() {
    const projects = getFeaturedProjects();

    return (
        <section>
            <Container className="min-h-0">
                <SectionTitle text="Selected Work" />
                <p className="-mt-10 mb-12 text-center text-base leading-relaxed text-(--neutralColor) max-tablet:-mt-8 max-tablet:mb-10 max-phone:-mt-4 max-phone:mb-8 max-phone:text-sm">
                    A selection of products and frontend experiences I&apos;ve worked on.
                </p>

                <div className="grid grid-cols-3 gap-6 max-small-desktop:grid-cols-2 max-tablet:grid-cols-2 max-big-phone:grid-cols-1">
                    {projects.map((project) => (
                        <HomeProjectCard key={project.id} project={project} />
                    ))}
                </div>

                <div className="mt-12 flex justify-center max-phone:mt-8">
                    <ArrowLink href="/projects">View all projects →</ArrowLink>
                </div>
            </Container>
        </section>
    );
}

export default SelectedWork;
