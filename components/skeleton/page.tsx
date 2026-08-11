import cls from "@/utils/class_names";

type SkeletonProps = {
    className?: string;
};

const pulse =
    "animate-shimmer rounded-lg bg-[linear-gradient(90deg,var(--secondaryColor)_25%,color-mix(in_srgb,var(--secondaryColor)_70%,var(--primaryColor))_50%,var(--secondaryColor)_75%)] [background-size:200%_100%]";

export function SkeletonPulse({className = ""}: SkeletonProps) {
    return <div className={cls(pulse, className)} aria-hidden="true" />;
}

export function ImageSkeleton({className = ""}: SkeletonProps) {
    return <SkeletonPulse className={cls("size-full min-h-[120px] rounded-[inherit]", className)} />;
}

function TitleSkeleton({className = ""}: SkeletonProps) {
    return <SkeletonPulse className={cls("mb-16 h-[2.8rem] w-[240px] self-center max-tablet:mb-12 max-tablet:h-[2.5rem] max-phone:h-6 max-phone:w-[160px]", className)} />;
}

export function BlogCardSkeleton() {
    return (
        <div
            className="flex w-full items-center justify-between gap-[100px] max-desktop:gap-[60px] max-medium-desktop:gap-10 max-big-phone:flex-col"
            aria-hidden="true"
        >
            <SkeletonPulse className="aspect-[16/10] w-[30%] shrink-0 rounded-2xl max-big-phone:w-full" />
            <div className="flex w-full flex-1 flex-col gap-5 max-desktop:gap-2.5">
                <SkeletonPulse className="h-4 w-[45%] max-phone:h-3.5" />
                <SkeletonPulse className="h-7 w-[75%] max-medium-desktop:h-6 max-tablet:h-5" />
                <SkeletonPulse className="h-3.5 w-full" />
                <SkeletonPulse className="h-3.5 w-[90%]" />
                <SkeletonPulse className="mt-[15px] h-10 w-[120px] max-medium-desktop:mt-[5px]" />
            </div>
        </div>
    );
}

export function ProjectCardSkeleton() {
    return (
        <div
            className="flex w-full flex-col-reverse items-center gap-3 rounded-[5px] bg-(--secondaryColor) p-2.5 shadow-[0_7px_29px_0_var(--secondaryColor)]"
            aria-hidden="true"
        >
            <SkeletonPulse className="mx-auto h-4 w-[70%]" />
            <SkeletonPulse className="aspect-[4/3] w-full rounded-[5px]" />
        </div>
    );
}

export function AboutImageSkeleton({className = ""}: SkeletonProps) {
    return (
        <SkeletonPulse
            className={cls(
                "h-[38rem] w-[30rem] max-w-full rounded-3xl max-medium-desktop:h-[28rem] max-medium-desktop:w-full",
                className
            )}
        />
    );
}

export function HomePageSkeleton() {
    return (
        <div className="flex flex-col" aria-hidden="true">
            <section className="relative flex h-screen flex-col gap-32 pt-[100px] max-tablet:h-auto max-tablet:min-h-0 max-tablet:gap-16">
                <div className="box-border flex min-h-[calc(100vh-112px)] flex-col bg-(--primaryColor) px-32 py-16 max-tablet:min-h-0 max-tablet:px-16 max-tablet:py-8 max-phone:p-8 max-phone:min-h-[calc(100vh-74px)]">
                    <div className="z-[1] flex flex-col gap-12 max-tablet:gap-8 max-phone:items-center">
                        <SkeletonPulse className="h-[4rem] w-[min(100%,520px)] max-tablet:h-8" />
                        <SkeletonPulse className="h-8 w-[260px] max-tablet:h-6 max-tablet:w-[200px]" />
                        <div className="flex gap-4">
                            <SkeletonPulse className="size-10 rounded-full" />
                            <SkeletonPulse className="size-10 rounded-full" />
                            <SkeletonPulse className="size-10 rounded-full" />
                        </div>
                        <SkeletonPulse className="h-11 w-[160px] rounded-md max-phone:self-center" />
                    </div>
                </div>
            </section>

            <section>
                <div className="box-border flex min-h-0 flex-col bg-(--primaryColor) px-32 py-16 max-tablet:px-16 max-tablet:py-8 max-phone:p-8">
                    <TitleSkeleton />
                    <div className="flex flex-wrap justify-between gap-20">
                        {Array.from({length: 2}).map((_, col) => (
                            <ul key={col} className="flex grow flex-col gap-8">
                                {Array.from({length: 5}).map((__, row) => (
                                    <li key={row} className="flex justify-between gap-8">
                                        <SkeletonPulse className="h-4 w-[40%]" />
                                        <SkeletonPulse className="h-4 w-[30%]" />
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export function BlogListSkeleton() {
    return (
        <div className="flex flex-col gap-12" aria-hidden="true">
            <TitleSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
        </div>
    );
}

export function BlogPostSkeleton() {
    return (
        <div className="flex flex-col" aria-hidden="true">
            <div className="mb-5 self-start">
                <SkeletonPulse className="size-[30px] rounded-full" />
            </div>
            <article className="flex flex-col items-center">
                <TitleSkeleton />
                <SkeletonPulse className="mb-[25px] h-[500px] w-full rounded-2xl max-medium-desktop:h-[400px]" />
                <div className="flex w-full flex-col gap-4">
                    <SkeletonPulse className="h-3.5 w-full" />
                    <SkeletonPulse className="h-3.5 w-full" />
                    <SkeletonPulse className="h-3.5 w-[95%]" />
                    <SkeletonPulse className="h-3.5 w-full" />
                    <SkeletonPulse className="h-3.5 w-[88%]" />
                    <SkeletonPulse className="mt-4 h-3.5 w-full" />
                    <SkeletonPulse className="h-3.5 w-[92%]" />
                    <SkeletonPulse className="h-3.5 w-[80%]" />
                </div>
            </article>
            <div className="mt-[30px] flex flex-wrap gap-[5px]">
                {Array.from({length: 4}).map((_, i) => (
                    <SkeletonPulse key={i} className="h-7 w-16 rounded-[5px]" />
                ))}
            </div>
        </div>
    );
}

export function ProjectsPageSkeleton() {
    return (
        <div className="flex flex-col" aria-hidden="true">
            <TitleSkeleton />
            <div className="mb-10 flex flex-wrap gap-2">
                {Array.from({length: 7}).map((_, i) => (
                    <SkeletonPulse key={i} className="h-8 w-[72px] rounded-full" />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-6 max-small-desktop:grid-cols-2 max-tablet:grid-cols-2 max-big-phone:grid-cols-1">
                {Array.from({length: 6}).map((_, i) => (
                    <ProjectCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

export function AboutPageSkeleton() {
    return (
        <div className="flex w-full flex-col gap-0" aria-hidden="true">
            <div className="flex flex-1 gap-[100px] max-medium-desktop:flex-col max-tablet:gap-[120px]">
                <AboutImageSkeleton />
                <div className="mt-[150px] flex flex-1 flex-col gap-6 max-desktop:mt-0 max-big-phone:mt-2.5">
                    <SkeletonPulse className="mb-6 h-[2.8rem] w-[220px] max-tablet:h-[2.5rem] max-phone:h-6" />
                    <SkeletonPulse className="h-3.5 w-full" />
                    <SkeletonPulse className="h-3.5 w-full" />
                    <SkeletonPulse className="h-3.5 w-[95%]" />
                    <SkeletonPulse className="h-3.5 w-full" />
                    <SkeletonPulse className="h-3.5 w-[90%]" />
                    <SkeletonPulse className="h-3.5 w-[85%]" />
                    <SkeletonPulse className="mt-4 h-11 w-[160px] rounded-md" />
                </div>
            </div>
        </div>
    );
}

export function EducationSectionSkeleton() {
    return (
        <div aria-hidden="true">
            <TitleSkeleton />
            <div className="flex justify-between gap-5 max-medium-desktop:flex-col">
                {Array.from({length: 2}).map((_, i) => (
                    <div
                        key={i}
                        className="flex w-full max-w-[600px] flex-col gap-8 rounded-lg bg-(--primaryColor) p-8"
                    >
                        <div className="flex items-center gap-8">
                            <SkeletonPulse className="size-16 shrink-0 rounded-lg" />
                            <div className="flex w-full flex-col gap-3">
                                <SkeletonPulse className="h-5 w-[70%]" />
                                <SkeletonPulse className="h-3.5 w-[50%]" />
                            </div>
                        </div>
                        <SkeletonPulse className="h-3.5 w-full" />
                        <SkeletonPulse className="h-3.5 w-[80%]" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ContactPageSkeleton() {
    return (
        <div
            className="flex justify-between gap-5 max-medium-desktop:gap-5 max-small-desktop:flex-col max-small-desktop:gap-[50px]"
            aria-hidden="true"
        >
            <div className="z-[1] flex max-w-[500px] flex-col self-center max-medium-desktop:max-w-[400px] max-small-desktop:max-w-none">
                <SkeletonPulse className="mb-12 h-[2.8rem] w-[240px] max-medium-desktop:mb-8 max-tablet:h-[2.5rem] max-phone:mb-6 max-phone:h-6" />
                <SkeletonPulse className="h-5 w-full max-medium-desktop:h-4" />
                <SkeletonPulse className="mt-3 h-5 w-[90%] max-medium-desktop:h-4" />
                <SkeletonPulse className="mt-3 h-5 w-[70%] max-medium-desktop:h-4" />
                <div className="mt-20 flex items-center gap-[15px] max-medium-desktop:mt-[50px] max-small-desktop:mt-5">
                    <SkeletonPulse className="size-6 rounded-full" />
                    <SkeletonPulse className="h-4 w-[220px]" />
                </div>
            </div>

            <div className="z-[1] w-full max-w-[520px] rounded-[20px] border border-solid border-[color-mix(in_srgb,var(--firstWaveColor)_55%,transparent)] bg-(--secondaryColor) px-[35px] py-[30px] shadow-[0_8px_28px_0_color-mix(in_srgb,var(--firstWaveColor)_28%,transparent)] max-medium-desktop:grow max-medium-desktop:px-[30px] max-medium-desktop:py-[25px] max-small-desktop:max-w-none max-small-desktop:p-5">
                <SkeletonPulse className="mb-[50px] h-[38px] w-[70%] max-medium-desktop:mb-[30px] max-medium-desktop:h-[30px]" />
                <div className="flex flex-col gap-5 max-medium-desktop:gap-2.5">
                    <div className="flex gap-8 max-medium-desktop:flex-col max-medium-desktop:gap-2.5 max-small-desktop:flex-row">
                        <SkeletonPulse className="h-10 grow rounded-md" />
                        <SkeletonPulse className="h-10 grow rounded-md" />
                    </div>
                    <SkeletonPulse className="h-10 w-full rounded-md" />
                    <SkeletonPulse className="h-[220px] w-full rounded-md" />
                    <SkeletonPulse className="h-11 w-[160px] rounded-md" />
                </div>
            </div>
        </div>
    );
}

export function LabsPageSkeleton() {
    return (
        <div className="flex flex-col text-white" aria-hidden="true">
            <section className="overflow-hidden px-24 pb-20 pt-36 max-tablet:px-8 max-tablet:pb-16 max-tablet:pt-28 max-phone:px-[1.1rem]">
                <div className="flex max-w-3xl flex-col gap-4">
                    <SkeletonPulse className="h-3 w-[160px] !bg-[#1a1a24]" />
                    <SkeletonPulse className="h-12 w-[280px] max-w-[70%] !bg-[#1a1a24]" />
                    <SkeletonPulse className="h-3.5 w-full max-w-[520px] !bg-[#1a1a24]" />
                    <div className="mt-8 flex flex-wrap gap-12">
                        {Array.from({length: 3}).map((_, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <SkeletonPulse className="h-8 w-12 !bg-[#1a1a24]" />
                                <SkeletonPulse className="h-3 w-20 !bg-[#1a1a24]" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-24 pb-24 max-tablet:px-8 max-phone:px-[1.1rem]">
                <div className="grid grid-cols-3 gap-5 max-small-desktop:grid-cols-2 max-tablet:grid-cols-1">
                    {Array.from({length: 5}).map((_, i) => (
                        <div key={i} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0c0c14] p-6">
                            <SkeletonPulse className="size-10 rounded-lg !bg-[#1a1a24]" />
                            <SkeletonPulse className="h-5 w-[60%] !bg-[#1a1a24]" />
                            <SkeletonPulse className="h-3.5 w-full !bg-[#1a1a24]" />
                            <SkeletonPulse className="h-3.5 w-[80%] !bg-[#1a1a24]" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export function LabsCategorySkeleton() {
    return (
        <div className="flex flex-col text-white" aria-hidden="true">
            <section className="overflow-hidden px-24 pb-10 pt-36 max-tablet:px-8 max-tablet:pt-28 max-phone:px-[1.1rem]">
                <SkeletonPulse className="mb-8 h-3 w-[180px] !bg-[#1a1a24]" />
                <div className="flex items-end justify-between gap-6 max-tablet:flex-col max-tablet:items-start">
                    <div className="flex flex-col gap-3">
                        <SkeletonPulse className="h-10 w-[240px] !bg-[#1a1a24]" />
                        <SkeletonPulse className="h-3.5 w-[320px] max-w-full !bg-[#1a1a24]" />
                    </div>
                    <SkeletonPulse className="h-8 w-24 rounded-full !bg-[#1a1a24]" />
                </div>
            </section>

            <section className="flex flex-col gap-4 px-24 pb-24 max-tablet:px-8 max-phone:px-[1.1rem]">
                {Array.from({length: 4}).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#0c0c14] p-5 max-phone:flex-col max-phone:items-start"
                    >
                        <div className="flex w-full flex-col gap-3">
                            <SkeletonPulse className="h-5 w-[40%] !bg-[#1a1a24]" />
                            <SkeletonPulse className="h-3.5 w-[80%] !bg-[#1a1a24]" />
                            <div className="flex gap-2">
                                <SkeletonPulse className="h-6 w-14 rounded-full !bg-[#1a1a24]" />
                                <SkeletonPulse className="h-6 w-16 rounded-full !bg-[#1a1a24]" />
                                <SkeletonPulse className="h-6 w-12 rounded-full !bg-[#1a1a24]" />
                            </div>
                        </div>
                        <SkeletonPulse className="h-8 w-20 shrink-0 rounded-full !bg-[#1a1a24]" />
                    </div>
                ))}
            </section>
        </div>
    );
}
