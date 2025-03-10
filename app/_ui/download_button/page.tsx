"use client";

import React from "react";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaDownload } from "react-icons/fa";
import styles from "./page.module.sass";
// import Resume from "@/app/_ui/resume/page";
// import ReactDOMServer from "react-dom/server";
// import { jsPDF } from "jspdf";

function DownloadButton() {
    const isMobile = useMediaQuery("(max-width: 600px)");

    const downloadHandler = async () => {
        // TODO
    };

    return (
        <Button
            size={isMobile ? "small" : "medium"}
            className={styles.button}
            variant="contained"
            startIcon={<FaDownload />}
            onClick={downloadHandler}
            disabled={true}
        >
            Download Resume
        </Button>
    );
}

export default DownloadButton;
