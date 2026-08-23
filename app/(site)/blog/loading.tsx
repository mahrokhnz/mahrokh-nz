import Container from "@/components/container/page";
import {BlogListSkeleton} from "@/components/skeleton/page";

export default function BlogLoading() {
    return (
        <main className="flex flex-col gap-4 pt-[100px]">
            <Container>
                <BlogListSkeleton />
            </Container>
        </main>
    );
}
