"use client";

import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa";
import styles from "./page.module.sass";
import Button from "@/components/Button/page";
import dynamic from "next/dynamic";

const Resume = dynamic(() => import("@/components/resume/page"), { ssr: false });

interface DownloadButtonProps {
    className?: string
}

function DownloadButton({ className }: DownloadButtonProps) {
    const resumeRef = useRef<HTMLDivElement>(null);

    const downloadHandler = async () => {
        const html2pdf = (await import("html2pdf.js")).default;
        if (!resumeRef.current) return;

        html2pdf()
            .set({
                margin: [0, -10, -1, 0],
                filename: 'Nabizadeh_CV.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: [210, 297], orientation: 'portrait' },
            })
            .from(resumeRef.current)
            .save();
    };

    return (
        <>
            <Button
                className={`${styles.button} ${className}`}
                startIcon={<FaDownload />}
                onClick={downloadHandler}
            >
                Download Resume
            </Button>

            <div style={{ display: "none" }}>
                <div ref={resumeRef}>
                    <Resume />
                </div>
            </div>
        </>
    );
}

export default DownloadButton;
