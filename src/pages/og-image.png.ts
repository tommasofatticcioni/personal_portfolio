import type { APIRoute } from "astro";
import { createElement } from "react";
import OgImage, { OG_SIZE } from "@/og/OgImage";
import { renderSvg, svgToPng } from "@/og/render";

// Prerendered at build time into dist/og-image.png (no server needed).
export const prerender = true;

export const GET: APIRoute = async () => {
	const svg = await renderSvg(createElement(OgImage), OG_SIZE);
	const png = svgToPng(svg, OG_SIZE.width);

	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
};
