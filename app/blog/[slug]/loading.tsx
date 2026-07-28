import Container from "@/components/container/page";
import {BlogCardSkeleton, SkeletonPulse} from "@/components/skeleton/page";
import styles from "@/components/skeleton/page.module.sass";
import cls from "@/utils/class_names";

export default function BlogPostLoading() {
    return (
        <Container>
            <div className={cls(styles.pageShell, styles.stack)}>
                <SkeletonPulse className={styles.pageTitle} />
                <SkeletonPulse className={styles.contactForm} />
                <BlogCardSkeleton />
            </div>
        </Container>
    );
}
