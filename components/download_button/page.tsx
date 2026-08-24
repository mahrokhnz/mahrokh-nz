"use client";

import React, {useEffect, useRef, useState} from "react";
import {FaDownload} from "react-icons/fa";
import Button from "@/components/Button/page";
import dynamic from "next/dynamic";
import cls from "@/utils/class_names";

const Resume = dynamic(() => import("@/components/resume/page"), {ssr: false});

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;

interface DownloadButtonProps {
    className?: string
}

function removePdfOverlays() {
    document.querySelectorAll(".html2pdf__overlay").forEach((node) => node.remove());
}

async function saveResumePdf(root: HTMLElement) {
    const html2canvas = (await import("html2canvas-pro")).default;
    const {jsPDF} = await import("jspdf");

    const pages = [...root.querySelectorAll<HTMLElement>("[data-resume-page]")];
    if (pages.length === 0) {
        throw new Error("Resume pages were not ready.");
    }

    const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
    });

    for (let index = 0; index < pages.length; index++) {
        const canvas = await html2canvas(pages[index], {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,
        });

        if (index > 0) {
            pdf.addPage();
        }

        pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM);
    }

    pdf.save("Nabizadeh_CV.pdf");
}

function DownloadButton({className}: DownloadButtonProps) {
    const resumeRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        removePdfOverlays();
    }, []);

    const downloadHandler = async () => {
        if (!resumeRef.current || isDownloading) return;

        setIsDownloading(true);
        removePdfOverlays();

        try {
            await saveResumePdf(resumeRef.current);
        } catch (error) {
            console.error("Resume download failed:", error);
        } finally {
            removePdfOverlays();
            setIsDownloading(false);
        }
    };

    return (
        <>
            <Button
                className={cls("!mt-5", className)}
                startIcon={<FaDownload />}
                onClick={downloadHandler}
                disabled={isDownloading}
                loading={isDownloading}
            >
                Download Resume
            </Button>

            <div
                aria-hidden
                className="pointer-events-none fixed top-0 left-[-10000px]"
            >
                <div ref={resumeRef}>
                    <Resume />
                </div>
            </div>
        </>
    );
}

export default DownloadButton;
