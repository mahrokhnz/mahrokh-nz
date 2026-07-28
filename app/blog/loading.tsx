import Container from "@/components/container/page";
import {BlogListSkeleton} from "@/components/skeleton/page";

export default function BlogLoading() {
    return (
        <Container>
            <BlogListSkeleton />
        </Container>
    );
}
