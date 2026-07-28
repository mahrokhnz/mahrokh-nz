"use client";

import Image, {type ImageProps} from "next/image";
import {useState} from "react";
import {ImageSkeleton} from "@/components/skeleton/page";
import cls from "@/utils/class_names";
import styles from "./page.module.sass";

type SkeletonImageProps = ImageProps & {
    wrapperClassName?: string;
    skeletonClassName?: string;
};

function SkeletonImage({
    className = "",
    wrapperClassName = "",
    skeletonClassName = "",
    alt,
    onLoad,
    fill,
    ...props
}: SkeletonImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={cls(styles.wrapper, wrapperClassName)}>
            {!loaded && <ImageSkeleton className={cls(styles.skeleton, skeletonClassName)} />}
            <Image
                {...props}
                fill={fill}
                alt={alt}
                data-fill={fill ? "" : undefined}
                className={cls(styles.image, loaded && styles.loaded, className)}
                onLoad={(event) => {
                    setLoaded(true);
                    onLoad?.(event);
                }}
            />
        </div>
    );
}

export default SkeletonImage;
