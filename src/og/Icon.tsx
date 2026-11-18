// Site icon: "</>" in Kola, taken from the accent box of the social preview image.
// Rendered at build time into favicon.svg, favicon.ico and apple-touch-icon.png.
export const ICON_COLORS = {
	background: "#0a0a0a",
	foreground: "#e5e5e5",
};

type IconProps = {
	/** Square size in px. */
	size: number;
	/** Rounded tile for browser tabs; square for the Apple touch icon (iOS rounds it itself). */
	rounded?: boolean;
};

export default function Icon({ size, rounded = true }: IconProps) {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: ICON_COLORS.background,
				borderRadius: rounded ? size * 0.22 : 0,
				color: ICON_COLORS.foreground,
				fontFamily: "Kola",
				fontSize: size * 0.5,
				// Kola's glyphs sit slightly high in their line box; nudge them to the optical center.
				paddingTop: size * 0.04,
				boxSizing: "border-box",
				letterSpacing: -size * 0.02,
			}}
		>
			{"</>"}
		</div>
	);
}
