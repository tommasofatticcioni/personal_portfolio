import type { APIRoute } from "astro";
import { iconPng } from "@/og/icons";

export const prerender = true;

// Home-screen icon for iOS. Square: iOS applies its own rounded corners.
export const GET: APIRoute = async () =>
	new Response(new Uint8Array(await iconPng(180, false)), {
		headers: { "Content-Type": "image/png" },
	});
