"use client"

import React, { useEffect, useRef } from 'react';
import styles from './page.module.sass';

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
    if (width > 1500) {
        return 250;
    } else if (width > 1000) {
        return 200;
    } else if (width > 500) {
        return 150;
    } else if (width > 200) {
        return 50;
    }
};

const headerBoundary = (width: number) => {
    console.log(width)
    if (width > 1000) {
        return 120;
    } else if (width > 200) {
        return 90;
    }
};

const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas!.getContext('2d')!;

        const resizeCanvas = () => {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let mouseP: TMouse = { x: 0, y: 0 };

        const stars: TStar[] = new Array(numberOfStars(window.innerWidth))
            .fill(0)
            .map(() => ({
                x: Math.random() * canvas!.width,
                y: Math.random() * canvas!.height,
                r: 0.9,
                color: '#808188',
                sx: 0.1 - Math.random() * 0.5,
                sy: 0.1 - Math.random() * 0.5,
            }));

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height);

            stars.forEach((star) => {
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2, false);
                ctx.fill();
            });
        };

        const animate = () => {
            stars.forEach((star) => {
                star.x += star.sx;
                star.y += star.sy;

                if (star.x < star.r || star.x > canvas!.width - star.r) {
                    star.sx = -star.sx;
                }

                if (star.y < star.r || star.y > canvas!.height - star.r) {
                    star.sy = -star.sy;
                }
            });

            drawStars();
            detectStars(mouseP);

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        const pythagoras = (firstPoint: TStar | TMouse, secondPoint: TStar) => {
            const xd = Math.abs(firstPoint.x - secondPoint.x);
            const yd = Math.abs(firstPoint.y - secondPoint.y);
            return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
        };

        const detectLines = (nearStars: TStar[]) => {
            for (let i = 0; i < nearStars.length; i++) {
                for (let j = 1; j < nearStars.length - 1; j++) {
                    const diff = pythagoras(nearStars[i], nearStars[j]);

                    if (diff < 150) {
                        ctx.beginPath();
                        ctx.moveTo(nearStars[i].x, nearStars[i].y);
                        ctx.lineTo(nearStars[j].x, nearStars[j].y);
                        ctx.strokeStyle = 'rgba(255, 0, 180, .5)';
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        };

        const detectStars = (mouse: TMouse) => {
            const nearStars: TStar[] = [];
            stars.forEach((star) => {
                const diff = pythagoras(mouse, star);

                if (diff < 150 && star.y > headerBoundary(window.innerWidth)!) {
                    nearStars.push(star);
                }
            });

            detectLines(nearStars);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas!.getBoundingClientRect();
            mouseP = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };

            detectStars(mouseP);
        };

        canvas!.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas!.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas className={styles.canvas} ref={canvasRef}></canvas>;
};

export default Canvas;