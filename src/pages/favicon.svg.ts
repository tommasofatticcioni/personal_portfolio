import type { APIRoute } from "astro";
import { iconSvg } from "@/og/icons";

export const prerender = true;

export const GET: APIRoute = async () =>
	new Response(await iconSvg(64), {
		headers: { "Content-Type": "image/svg+xml" },
	});
