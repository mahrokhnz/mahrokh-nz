import LabsSection from "@/app/labs/_components/labs_section";
import LabsGrid from "@/app/labs/_components/labs_grid";
import {getLabsHero} from "@/app/labs/_lib/data";

function LabsHero() {
    const hero = getLabsHero();

    return (
        <LabsSection
            as="header"
            className="overflow-hidden pb-20 pt-36 max-tablet:pb-16 max-tablet:pt-28"
        >
            <LabsGrid variant="hero" glow />

            <div
                className="relative max-w-3xl"
                style={{animation: "labs-fade-up 0.7s ease-out both"}}
            >
                <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--labs-border-strong)] bg-[rgba(139,139,255,0.06)] px-3.5 py-1.5">
                    <span className="size-1.5 rounded-full bg-[var(--labs-accent)]" aria-hidden />
                    <span className="text-[0.7rem] font-semibold tracking-[0.14em] text-[var(--labs-accent)]">
                        {hero.badge}
                    </span>
                </p>

                <h1 className="mb-6 text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
                    <span className="text-white">{hero.titleLead}</span>{" "}
                    <span className="text-[var(--labs-accent)]">{hero.titleAccent}</span>
                </h1>

                <p className="mb-14 max-w-xl text-[1.05rem] leading-relaxed text-[var(--labs-muted)] max-phone:mb-10 max-phone:text-[0.95rem]">
                    {hero.description}
                </p>

                <dl className="flex flex-wrap gap-12 max-phone:gap-8">
                    {hero.stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col gap-2">
                            <dt className="order-2 text-[0.7rem] font-medium tracking-[0.16em] text-[var(--labs-muted)]">
                                {stat.label}
                            </dt>
                            <dd className="order-1 text-[2rem] font-semibold leading-none text-[var(--labs-accent)] max-phone:text-[1.6rem]">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </LabsSection>
    );
}

export default LabsHero;
