"use client";

import React, { useRef, useEffect } from "react";

const EyeCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Draw a single eye
    const drawEye = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number,
        lx: number | null = null,
        ly: number | null = null
    ) => {
        lx = lx ?? x;
        ly = ly ?? y;

        const angle = Math.atan2(ly - ctx.canvas.height / 2, lx - ctx.canvas.width / 2);
        const distance = Math.hypot(lx - ctx.canvas.width / 2, ly - ctx.canvas.height / 2);
        const maxDistance = Math.hypot(ctx.canvas.width / 2, ctx.canvas.height / 2);

        const bx = Math.cos(angle) * ((size * 3) / 5) * (distance / maxDistance);
        const by = Math.sin(angle) * ((size * 3) / 5) * (distance / maxDistance);

        // Draw the outer circle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.lineWidth = 2 * (size / 20);
        ctx.stroke();

        // Draw the pupil
        ctx.beginPath();
        ctx.arc(x + bx, y + by, size / 4, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();

        // Draw the highlight
        ctx.beginPath();
        ctx.arc(x + bx + size / 14, y + by - size / 14, size / 20, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
    };

    // Draw both eyes and the connecting curve
    const drawEyes = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        baseSize: number,
        xp: number | null = null,
        yp: number | null = null
    ) => {
        const scaleFactor = Math.min(ctx.canvas.width, ctx.canvas.height) / 1000;
        const size = baseSize * scaleFactor;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        drawEye(ctx, x - size - 50 * scaleFactor, y, size, xp, yp);
        drawEye(ctx, x + size + 50 * scaleFactor, y, size, xp, yp);

        // Draw the connecting curve
        ctx.beginPath();
        ctx.bezierCurveTo(
            x - 50 * scaleFactor,
            y,
            x,
            y - 50 * scaleFactor,
            x + 50 * scaleFactor,
            y
        );
        ctx.lineWidth = 15 * scaleFactor;
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize the canvas to fit its parent
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement!.offsetWidth;
            canvas.height = canvas.parentElement!.offsetHeight - 200;
            drawEyes(ctx, canvas.width / 2, canvas.height / 2, 150);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Update the eyes on mouse move
        const handleMouseMove = (e: MouseEvent) => {
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

    return <canvas style={{ width: "100%", height: "100%" }} ref={canvasRef}></canvas>;
};

export default EyeCanvas;
