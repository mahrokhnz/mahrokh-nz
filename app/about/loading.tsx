import Container from "@/components/container/page";
import {AboutPageSkeleton, EducationSectionSkeleton} from "@/components/skeleton/page";

export default function AboutLoading() {
    return (
        <main>
            <section className="pt-[100px]">
                <Container className="flex flex-row flex-wrap justify-between gap-[100px]">
                    <AboutPageSkeleton />
                </Container>
            </section>
            <section>
                <Container className="bg-(--secondaryColor)">
                    <EducationSectionSkeleton />
                </Container>
            </section>
        </main>
    );
}
