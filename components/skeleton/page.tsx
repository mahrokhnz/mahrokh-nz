import styles from "./page.module.sass";
import cls from "@/utils/class_names";

type SkeletonProps = {
    className?: string;
};

export function SkeletonPulse({className = ""}: SkeletonProps) {
    return <div className={cls(styles.pulse, className)} aria-hidden="true" />;
}

export function ImageSkeleton({className = ""}: SkeletonProps) {
    return <SkeletonPulse className={cls(styles.imageSkeleton, className)} />;
}

export function BlogCardSkeleton() {
    return (
        <div className={styles.blogCard} aria-hidden="true">
            <SkeletonPulse className={styles.blogImage} />
            <div className={styles.blogContent}>
                <SkeletonPulse className={styles.lineSm} />
                <SkeletonPulse className={styles.lineLg} />
                <SkeletonPulse className={styles.line} />
                <SkeletonPulse className={styles.line} />
                <SkeletonPulse className={styles.button} />
            </div>
        </div>
    );
}

export function ProjectCardSkeleton() {
    return (
        <div className={styles.projectCard} aria-hidden="true">
            <SkeletonPulse className={styles.projectImage} />
            <SkeletonPulse className={styles.projectTitle} />
        </div>
    );
}

export function AboutImageSkeleton({className = ""}: SkeletonProps) {
    return <SkeletonPulse className={cls(styles.aboutImage, className)} />;
}

export function BlogListSkeleton() {
    return (
        <div className={cls(styles.pageShell, styles.stack)}>
            <SkeletonPulse className={styles.pageTitle} />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
        </div>
    );
}

export function ProjectsPageSkeleton() {
    return (
        <div className={cls(styles.pageShell, styles.stack)}>
            <SkeletonPulse className={styles.pageTitle} />
            <ProjectCardSkeleton />
            <div className={styles.projectGrid}>
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
            </div>
        </div>
    );
}

export function AboutPageSkeleton() {
    return (
        <div className={cls(styles.pageShell, styles.aboutShell)} aria-hidden="true">
            <AboutImageSkeleton />
            <div className={styles.stack}>
                <SkeletonPulse className={styles.pageTitle} />
                <SkeletonPulse className={styles.line} />
                <SkeletonPulse className={styles.line} />
                <SkeletonPulse className={styles.line} />
                <SkeletonPulse className={styles.button} />
            </div>
        </div>
    );
}

export function ContactPageSkeleton() {
    return (
        <div className={cls(styles.pageShell, styles.stack)} aria-hidden="true">
            <SkeletonPulse className={styles.pageTitle} />
            <SkeletonPulse className={styles.contactCopy} />
            <SkeletonPulse className={styles.contactForm} />
        </div>
    );
}
