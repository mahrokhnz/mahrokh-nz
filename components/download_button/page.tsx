"use client";

import React from "react";
import { FaDownload } from "react-icons/fa";
import styles from "./page.module.sass";
import Resume from "@/components/resume/page";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import Button from "@/components/Button/page";

interface DownloadButtonProps {
    className?: string
}

function DownloadButton({className}: DownloadButtonProps) {
    const downloadHandler = async () => {
        const rawHtml = ReactDOMServer.renderToStaticMarkup(<Resume />);

        const completeHtml = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Resume</title>
                <style>
                    body {
                    margin: 0;
                    padding: 0;
                    }
                </style>
            </head>
                <body>
                    ${rawHtml}
                </body>
            </html>
        `

        html2pdf()
            .set({
                margin: [0, -10, -1, 0],
                filename: 'Nabizadeh_CV.pdf',
                html2canvas: {scale: 2},
                jsPDF: {unit: 'mm', format: [210, 297], orientation: 'portrait'},
            })
            .from(completeHtml)
            .save();
    };

    return (
        <Button
            className={`${styles.button} ${className}`}
            startIcon={<FaDownload />}
            onClick={downloadHandler}
        >
            Download Resume
        </Button>
    );
}

export default DownloadButton;
