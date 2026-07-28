"use client";

import Image, {type ImageProps} from "next/image";
import {useState} from "react";
import {ImageSkeleton} from "@/components/skeleton/page";
import cls from "@/utils/class_names";

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
        <div className={cls(
            fill ? "absolute inset-0" : "relative block size-full",
            "overflow-hidden rounded-[inherit]",
            wrapperClassName
        )}>
            {!loaded && <ImageSkeleton className={cls("absolute inset-0 z-[1]", skeletonClassName)} />}
            <Image
                {...props}
                fill={fill}
                alt={alt}
                data-fill={fill ? "" : undefined}
                className={cls(
                    "skeleton-img object-cover opacity-0 transition-opacity duration-[0.25s] ease-in-out",
                    loaded && "opacity-100",
                    className
                )}
                onLoad={(event) => {
                    setLoaded(true);
                    onLoad?.(event);
                }}
            />
        </div>
    );
}

export default SkeletonImage;
