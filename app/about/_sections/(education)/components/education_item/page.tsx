import styles from "./page.module.sass";
import Image from "next/image";
import React from "react";
import {educationType} from "@/app/about/_sections/(education)/type";

interface IEducationItemProps {
    data: educationType
}

function EducationItem({data}: IEducationItemProps) {

    return (
        <div className={styles.educationItem}>
            <div className={styles.universityWrapper}>
                <Image
                    className={styles.myImage}
                    src={data.image}
                    alt='University of Science And Culture'
                    width={100}
                    height={100}
                    style={{objectFit: 'contain'}}
                />
                <h2>{data.name}</h2>
            </div>

            <div className={styles.infoWrapper}>
                <h3>{data.degree}</h3>
                <span>{data.period}</span>
            </div>
        </div>
    );
}

export default EducationItem