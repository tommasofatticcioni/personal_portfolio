import type { APIRoute } from "astro";
import { iconPng } from "@/og/icons";
import { pngsToIco } from "@/og/render";

export const prerender = true;

// Fallback for browsers and tools that don't use the SVG icon.
export const GET: APIRoute = async () => {
	const sizes = [16, 32, 48];
	const images = await Promise.all(sizes.map(async (size) => ({ size, png: await iconPng(size) })));

	return new Response(new Uint8Array(pngsToIco(images)), {
		headers: { "Content-Type": "image/x-icon" },
	});
};
