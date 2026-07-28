"use client";

import React from "react";
import TimeConvertor from "@/utils/time_convertor";
import Button from "@/components/Button/page";
import {useRouter} from "next/navigation";
import {BlogType} from "@/app/blog/page";
import SkeletonImage from "@/components/skeleton_image/page";

interface BlogRowProps {
    blogData: BlogType;
}

function BlogRow({blogData}: BlogRowProps) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between gap-[100px] max-desktop:gap-[60px] max-medium-desktop:gap-10 max-big-phone:flex-col">
            {blogData.coverImage ? (
                <SkeletonImage
                    src={`/images/blog/${blogData.coverImage}`}
                    alt={blogData.title}
                    width={480}
                    height={300}
                    sizes="(max-width: 600px) 100vw, 30vw"
                    className="size-full rounded-2xl object-cover"
                    wrapperClassName="w-[30%] shrink-0 overflow-hidden rounded-2xl aspect-[16/10] max-big-phone:w-full"
                />
            ) : null}

            <div className="flex flex-col gap-5 max-desktop:gap-2.5">
                <div className="text-base text-(--neutralColor) max-phone:text-sm">
                    {blogData.publishedAt ? <span>{TimeConvertor(blogData.publishedAt)}</span> : null}
                    {" "}
                    .
                    {" "}
                    <span>Mahrokh Nabizadeh</span>
                </div>

                <h1 className="text-2xl font-bold max-medium-desktop:text-xl max-tablet:text-lg max-phone:text-base max-phone:font-normal">{blogData.title}</h1>
                <p className="line-clamp-2 overflow-hidden text-ellipsis text-base leading-[1.8] max-tablet:text-[0.8rem] max-tablet:leading-[1.5]">{blogData.description}</p>

                <Button className="mt-[15px] self-start max-medium-desktop:mt-[5px]" onClick={() => router.push(`/blog/${blogData.slug}`)}>
                    Read More
                </Button>
            </div>
        </div>
    );
}

export default BlogRow;
