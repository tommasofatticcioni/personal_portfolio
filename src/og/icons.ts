import { createElement } from "react";
import Icon from "./Icon";
import { renderSvg, svgToPng } from "./render";

/** The icon as SVG at a given size (text already converted to paths). */
export function iconSvg(size: number, rounded = true) {
	return renderSvg(createElement(Icon, { size, rounded }), { width: size, height: size });
}

/** The icon as PNG. Rendered from an SVG drawn at that exact size, so small sizes stay crisp. */
export async function iconPng(size: number, rounded = true) {
	return svgToPng(await iconSvg(size, rounded), size);
}
