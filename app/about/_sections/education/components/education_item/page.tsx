import Image from "next/image";
import React from "react";
import {EducationType} from "@/app/about/_sections/education/type";

interface EducationItemProps {
    data: EducationType
}

function EducationItem({data}: EducationItemProps) {

    return (
        <div className="flex w-[600px] flex-col gap-8 rounded-lg bg-(--primaryColor) p-8 max-medium-desktop:w-auto">
            <div className="flex items-center gap-8">
                <Image
                    src={data.image}
                    alt='University of Science And Culture'
                    width={100}
                    height={100}
                    style={{objectFit: 'contain'}}
                />
                <h2 className="text-[1.4rem]">{data.name}</h2>
            </div>

            <div className="flex grow flex-col justify-between gap-8">
                <h3 className="text-[1.2rem] leading-[1.2]">{data.degree}</h3>
                <span className="text-[0.9rem]">{data.period}</span>
            </div>
        </div>
    );
}

export default EducationItem
