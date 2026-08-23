import Container from "@/components/container/page";
import {BlogPostSkeleton} from "@/components/skeleton/page";

export default function BlogPostLoading() {
    return (
        <main className="pt-[100px]">
            <Container>
                <BlogPostSkeleton />
            </Container>
        </main>
    );
}
