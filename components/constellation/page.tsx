"use client";

import React, {useEffect, useRef} from "react";
import styles from "./page.module.sass";

type TStar = {
    x: number;
    y: number;
    r: number;
    color: string;
    sx: number;
    sy: number;
};

type TMouse = {
    x: number;
    y: number;
};

const numberOfStars = (width: number) => {
    if (width > 1500) return 250;
    if (width > 1000) return 200;
    if (width > 500) return 150;
    if (width > 200) return 50;
    return 30;
};

interface CanvasProps {
    onlyStarts?: boolean;
}

const Canvas = ({onlyStarts = false}: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let logicalWidth = 0;
        let logicalHeight = 0;

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            logicalWidth = rect.width;
            logicalHeight = rect.height;

            const dpr = window.devicePixelRatio || 1;

            canvas.width = logicalWidth * dpr;
            canvas.height = logicalHeight * dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let mouse: TMouse | null = null;

        const stars: TStar[] = new Array(numberOfStars(logicalWidth || window.innerWidth))
            .fill(0)
            .map(() => ({
                x: Math.random() * (logicalWidth || window.innerWidth),
                y: Math.random() * (logicalHeight || window.innerHeight),
                r: 0.9,
                color: "#808188",
                sx: 0.1 - Math.random() * 0.5,
                sy: 0.1 - Math.random() * 0.5,
            }));

        const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => {
            const xd = a.x - b.x;
            const yd = a.y - b.y;
            return Math.sqrt(xd * xd + yd * yd);
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, logicalWidth, logicalHeight);

            stars.forEach((star) => {
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2, false);
                ctx.fill();
            });
        };

        const drawLinesAroundMouse = () => {
            if (!mouse || onlyStarts) return;

            const nearStars: TStar[] = [];

            stars.forEach((star) => {
                const diff = distance(mouse!, star);
                if (diff < 150) {
                    nearStars.push(star);

                    ctx.beginPath();
                    ctx.moveTo(mouse!.x, mouse!.y);
                    ctx.lineTo(star.x, star.y);
                    ctx.strokeStyle = "rgba(255, 0, 180, 0.3)";
                    ctx.stroke();
                    ctx.closePath();
                }
            });

            for (let i = 0; i < nearStars.length; i++) {
                for (let j = i + 1; j < nearStars.length; j++) {
                    const diff = distance(nearStars[i], nearStars[j]);
                    if (diff < 150) {
                        ctx.beginPath();
                        ctx.moveTo(nearStars[i].x, nearStars[i].y);
                        ctx.lineTo(nearStars[j].x, nearStars[j].y);
                        ctx.strokeStyle = "rgba(255, 0, 180, 0.5)";
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        };

        let animationId: number;

        const animate = () => {
            stars.forEach((star) => {
                star.x += star.sx;
                star.y += star.sy;

                if (star.x < star.r || star.x > logicalWidth - star.r) {
                    star.sx = -star.sx;
                }
                if (star.y < star.r || star.y > logicalHeight - star.r) {
                    star.sy = -star.sy;
                }
            });

            drawStars();
            drawLinesAroundMouse();

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [onlyStarts]);

    return <canvas className={styles.canvas} ref={canvasRef}></canvas>;
};

export default Canvas;