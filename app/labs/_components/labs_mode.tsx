"use client";

import {useEffect} from "react";

function LabsMode({children}: {children: React.ReactNode}) {
    useEffect(() => {
        const root = document.documentElement;
        root.classList.add("labs-mode");

        return () => {
            root.classList.remove("labs-mode");
        };
    }, []);

    return <>{children}</>;
}

export default LabsMode;
