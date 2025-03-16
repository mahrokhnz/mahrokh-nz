"use client";

import React, { useRef, useEffect } from "react";

const EyeCanvas = () => {
    const canvasRef = useRef(null);

    const drawEye = (ctx, x, y, size, lx = null, ly = null) => {
        lx = lx === null ? x : lx;
        ly = ly === null ? y : ly;

        const a = Math.atan2(ly - ctx.canvas.height / 2, lx - ctx.canvas.width / 2);
        const d = Math.hypot(lx - ctx.canvas.width / 2, ly - ctx.canvas.height / 2);
        const maxD = Math.hypot(ctx.canvas.width / 2, ctx.canvas.height / 2);

        const bx = Math.cos(a) * ((size * 3) / 5) * (d / maxD);
        const by = Math.sin(a) * ((size * 3) / 5) * (d / maxD);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.lineWidth = 2 * (size / 20); // Adjust border thickness dynamically
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x + bx, y + by, size / 4, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + bx + size / 14, y + by - size / 14, size / 20, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
    };

    const drawEyes = (ctx, x, y, baseSize, xp = null, yp = null) => {
        const scaleFactor = Math.min(ctx.canvas.width, ctx.canvas.height) / 1000; // Scale factor based on canvas size
        const size = baseSize * scaleFactor;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        drawEye(ctx, x - size - 50 * scaleFactor, y, size, xp, yp);
        drawEye(ctx, x + size + 50 * scaleFactor, y, size, xp, yp);

        ctx.beginPath();
        ctx.bezierCurveTo(
            x - 50 * scaleFactor,
            y,
            x,
            y - 50 * scaleFactor,
            x + 50 * scaleFactor,
            y
        );
        ctx.lineWidth = 15 * scaleFactor; // Adjust line width dynamically
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight - 200;
            drawEyes(ctx, canvas.width / 2, canvas.height / 2, 150);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const xp = e.clientX - rect.left;
            const yp = e.clientY - rect.top;
            drawEyes(ctx, canvas.width / 2, canvas.height / 2, 150, xp, yp);
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <canvas style={{ width: "100%", height: '100%' }} ref={canvasRef}></canvas>;
};

export default EyeCanvas;
