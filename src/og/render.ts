// Shared build-time rendering for the social preview image and the site icons.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactElement } from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

// Resolved from the project root: the bundled build runs from dist/, not src/.
const font = (file: string) => readFile(join(process.cwd(), "src/assets/og-fonts", file));

let fontsPromise: ReturnType<typeof loadFonts> | undefined;

async function loadFonts() {
	const [nippo, satoshi, kola] = await Promise.all([
		font("Nippo-Regular.ttf"),
		font("Satoshi-Regular.ttf"),
		font("Kola-Regular.ttf"),
	]);
	return [
		{ name: "Nippo", data: nippo, weight: 400 as const, style: "normal" as const },
		{ name: "Satoshi", data: satoshi, weight: 400 as const, style: "normal" as const },
		{ name: "Kola", data: kola, weight: 400 as const, style: "normal" as const },
	];
}

/** Renders a JSX tree to SVG. Text is converted to paths, so the SVG needs no fonts. */
export async function renderSvg(element: ReactElement, size: { width: number; height: number }) {
	fontsPromise ??= loadFonts();
	return satori(element, { ...size, fonts: await fontsPromise });
}

/** Rasterizes an SVG to a PNG of the given width. */
export function svgToPng(svg: string, width: number) {
	return new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
}

/** Packs PNG images into a single .ico file (PNG-compressed entries, supported by all modern browsers). */
export function pngsToIco(images: { size: number; png: Uint8Array }[]) {
	const headerSize = 6;
	const entrySize = 16;
	let offset = headerSize + entrySize * images.length;

	const header = Buffer.alloc(headerSize + entrySize * images.length);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(images.length, 4);

	images.forEach(({ size, png }, index) => {
		const entry = headerSize + entrySize * index;
		header.writeUInt8(size >= 256 ? 0 : size, entry); // width (0 means 256)
		header.writeUInt8(size >= 256 ? 0 : size, entry + 1); // height
		header.writeUInt8(0, entry + 2); // palette colors
		header.writeUInt8(0, entry + 3); // reserved
		header.writeUInt16LE(1, entry + 4); // color planes
		header.writeUInt16LE(32, entry + 6); // bits per pixel
		header.writeUInt32LE(png.length, entry + 8);
		header.writeUInt32LE(offset, entry + 12);
		offset += png.length;
	});

	return Buffer.concat([header, ...images.map(({ png }) => Buffer.from(png))]);
}
