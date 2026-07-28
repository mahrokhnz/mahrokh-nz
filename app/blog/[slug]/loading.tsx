import Container from "@/components/container/page";
import {BlogCardSkeleton, SkeletonPulse} from "@/components/skeleton/page";

export default function BlogPostLoading() {
    return (
        <Container>
            <div className="flex flex-col gap-10 py-[100px]">
                <SkeletonPulse className="h-9 w-[220px] max-w-[60%]" />
                <SkeletonPulse className="h-[280px] w-full max-w-[520px]" />
                <BlogCardSkeleton />
            </div>
        </Container>
    );
}
