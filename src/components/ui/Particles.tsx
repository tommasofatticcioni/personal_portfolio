
import type React from "react";
import { useEffect, useRef } from "react";
import { useResolvedTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export interface ParticlesProps {
	className?: string;
	children?: React.ReactNode;
	quantity?: number;
	staticity?: number;
	ease?: number;
	size?: number;
	refresh?: boolean;
	color?: string;
	vx?: number;
	vy?: number;
}

interface Circle {
	x: number;
	y: number;
	translateX: number;
	translateY: number;
	size: number;
	alpha: number;
	targetAlpha: number;
	dx: number;
	dy: number;
	magnetism: number;
}

function hexToRgb(hex: string): [number, number, number] {
	const value = hex.replace("#", "");
	const normalized = value.length === 3
		? value.split("").map((character) => character + character).join("")
		: value;
	const parsed = Number.parseInt(normalized, 16);

	return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
}

export const Particles: React.FC<ParticlesProps> = ({
	className,
	children,
	quantity = 80,
	staticity = 50,
	ease = 50,
	size = 0.4,
	refresh = false,
	color,
	vx = 0,
	vy = 0,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const resolvedTheme = useResolvedTheme();
	const particleColor = color ?? (resolvedTheme === "dark" ? "#ffffff" : "#171717");

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = canvasContainerRef.current;
		const context = canvas?.getContext("2d", { alpha: true });

		if (!canvas || !container || !context) return;

		const rgb = hexToRgb(particleColor);
		const mouse = { x: 0, y: 0 };
		const canvasSize = { width: 0, height: 0 };
		const circles: Circle[] = [];
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const lowPowerDevice = (navigator.hardwareConcurrency ?? 8) <= 4;
		const frameInterval = 1000 / (lowPowerDevice ? 24 : 30);
		let animationFrame = 0;
		let previousFrame = 0;
		let visible = !document.hidden;
		let canvasRect = canvas.getBoundingClientRect();

		const createCircle = (): Circle => ({
			x: Math.random() * canvasSize.width,
			y: Math.random() * canvasSize.height,
			translateX: 0,
			translateY: 0,
			size: Math.floor(Math.random() * 2) + size,
			alpha: 0,
			targetAlpha: Math.round((Math.random() * 0.6 + 0.1) * 10) / 10,
			dx: (Math.random() - 0.5) * 0.1,
			dy: (Math.random() - 0.5) * 0.1,
			magnetism: 0.1 + Math.random() * 4,
		});

		const drawCircle = (circle: Circle) => {
			context.beginPath();
			context.arc(
				circle.x + circle.translateX,
				circle.y + circle.translateY,
				circle.size,
				0,
				Math.PI * 2,
			);
			context.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${circle.alpha})`;
			context.fill();
		};

		const draw = () => {
			context.clearRect(0, 0, canvasSize.width, canvasSize.height);
			for (const circle of circles) drawCircle(circle);
		};

		const resetParticles = () => {
			circles.length = 0;
			const density = lowPowerDevice || canvasSize.width < 768 ? 0.5 : 1;
			const particleCount = Math.max(20, Math.round(quantity * density));
			for (let index = 0; index < particleCount; index += 1) {
				circles.push(createCircle());
			}
			draw();
		};

		const resizeCanvas = () => {
			canvasSize.width = container.clientWidth;
			canvasSize.height = container.clientHeight;
			const dpr = Math.min(window.devicePixelRatio || 1, lowPowerDevice ? 1 : 1.5);
			canvas.width = Math.round(canvasSize.width * dpr);
			canvas.height = Math.round(canvasSize.height * dpr);
			canvas.style.width = `${canvasSize.width}px`;
			canvas.style.height = `${canvasSize.height}px`;
			context.setTransform(dpr, 0, 0, dpr, 0, 0);
			canvasRect = canvas.getBoundingClientRect();
			resetParticles();
		};

		const update = (frameScale: number) => {
			for (let index = circles.length - 1; index >= 0; index -= 1) {
				const circle = circles[index];
				const closestEdge = Math.min(
					circle.x + circle.translateX - circle.size,
					canvasSize.width - circle.x - circle.translateX - circle.size,
					circle.y + circle.translateY - circle.size,
					canvasSize.height - circle.y - circle.translateY - circle.size,
				);
				const edgeOpacity = Math.max(0, Math.min(1, closestEdge / 20));

				if (edgeOpacity === 1) {
					circle.alpha = Math.min(circle.targetAlpha, circle.alpha + 0.02 * frameScale);
				} else {
					circle.alpha = circle.targetAlpha * edgeOpacity;
				}

				circle.x += (circle.dx + vx) * frameScale;
				circle.y += (circle.dy + vy) * frameScale;
				const attraction = Math.min(1, frameScale / ease);
				circle.translateX += (mouse.x / (staticity / circle.magnetism) - circle.translateX) * attraction;
				circle.translateY += (mouse.y / (staticity / circle.magnetism) - circle.translateY) * attraction;

				if (
					circle.x < -circle.size ||
					circle.x > canvasSize.width + circle.size ||
					circle.y < -circle.size ||
					circle.y > canvasSize.height + circle.size
				) {
					circles[index] = createCircle();
				}
			}
		};

		const animate = (timestamp: number) => {
			if (!visible || reduceMotion.matches) return;
			const elapsed = timestamp - previousFrame;
			if (elapsed >= frameInterval) {
				previousFrame = timestamp - (elapsed % frameInterval);
				update(Math.min(elapsed / (1000 / 60), 3));
				draw();
			}
			animationFrame = window.requestAnimationFrame(animate);
		};

		const startAnimation = () => {
			window.cancelAnimationFrame(animationFrame);
			if (visible && !reduceMotion.matches) {
				previousFrame = performance.now();
				animationFrame = window.requestAnimationFrame(animate);
			} else {
				draw();
			}
		};

		const handlePointerMove = (event: PointerEvent) => {
			mouse.x = event.clientX - canvasRect.left - canvasSize.width / 2;
			mouse.y = event.clientY - canvasRect.top - canvasSize.height / 2;
		};
		const handlePointerLeave = () => {
			mouse.x = 0;
			mouse.y = 0;
		};
		const handleVisibility = () => {
			visible = !document.hidden;
			startAnimation();
		};

		const resizeObserver = new ResizeObserver(resizeCanvas);
		resizeObserver.observe(container);
		window.addEventListener("pointermove", handlePointerMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", handlePointerLeave);
		document.addEventListener("visibilitychange", handleVisibility);
		reduceMotion.addEventListener("change", startAnimation);
		resizeCanvas();
		startAnimation();

		return () => {
			window.cancelAnimationFrame(animationFrame);
			resizeObserver.disconnect();
			window.removeEventListener("pointermove", handlePointerMove);
			document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
			document.removeEventListener("visibilitychange", handleVisibility);
			reduceMotion.removeEventListener("change", startAnimation);
		};
	}, [ease, particleColor, quantity, refresh, size, staticity, vx, vy]);

	return (
		<div
			ref={canvasContainerRef}
			aria-hidden={!children}
			className={cn(
				"pointer-events-none fixed inset-0 overflow-hidden bg-background transition-colors duration-300",
				className,
			)}
		>
			<canvas ref={canvasRef} className="absolute inset-0 size-full" />
			{children && <div className="pointer-events-auto relative z-10 h-full w-full">{children}</div>}
		</div>
	);
};

Particles.displayName = "Particles";

export default function ParticlesDemo() {
	return <Particles />;
}
