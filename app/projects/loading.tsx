import Container from "@/components/container/page";
import {ProjectsPageSkeleton} from "@/components/skeleton/page";

export default function ProjectsLoading() {
    return (
        <main className="pt-[100px]">
            <Container>
                <ProjectsPageSkeleton />
            </Container>
        </main>
    );
}
