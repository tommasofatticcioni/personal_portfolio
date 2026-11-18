// Social preview image, ported from the Next.js app/opengraph-image.tsx.
// Rendered to PNG at build time by src/pages/og-image.png.ts.
export const OG_SIZE = { width: 1200, height: 630 };

export default function OgImage() {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				position: "relative",
				overflow: "hidden",
				background: "#080808",
				color: "#f5f5f5",
				fontFamily: "Satoshi",
				padding: "64px 72px",
				// Keep the padding inside the 1200×630 frame (Satori otherwise adds it to width: 100%).
				boxSizing: "border-box",
			}}
		>
			{/* Background */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					opacity: 0.05,
					backgroundImage:
						"linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
					backgroundSize: "48px 48px",
				}}
			/>

			{/* Header */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					position: "relative",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						fontSize: 18,
						letterSpacing: "2px",
						color: "#888",
					}}
				>
					<div
						style={{
							width: 9,
							height: 9,
							borderRadius: "50%",
							background: "#a3e635",
						}}
					/>

					SOFTWARE DEVELOPER
				</div>

				<div
					style={{
						fontSize: 18,
						color: "#555",
					}}
				>
					tommasofatticcioni.com
				</div>
			</div>

			{/* Main */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					flex: 1,
					position: "relative",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<div
						style={{
							fontFamily: "Nippo",
							fontSize: 82,
							lineHeight: 0.95,
							letterSpacing: "-4px",
						}}
					>
						Tommaso
					</div>

					<div
						style={{
							fontFamily: "Nippo",
							fontSize: 82,
							lineHeight: 0.95,
							letterSpacing: "-4px",
							color: "#777",
						}}
					>
						Fatticcioni
					</div>

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							marginTop: 32,
							fontSize: 24,
							lineHeight: 1.4,
							color: "#999",
						}}
					>
						{/* Two divs instead of <br />, which Satori doesn't break on. */}
						<div>I build web applications, backend systems,</div>
						<div>APIs and database-driven software.</div>
					</div>
				</div>

				{/* Accent */}
				<div
					style={{
						width: 230,
						height: 230,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
						border: "1px solid #292929",
					}}
				>
					<div
						style={{
							fontFamily: "Kola",
							fontSize: 70,
							color: "#ddd",
						}}
					>
						{"</>"}
					</div>

					<div
						style={{
							position: "absolute",
							top: 16,
							left: 16,
							fontSize: 12,
							letterSpacing: "2px",
							color: "#444",
						}}
					>
						01 / 01
					</div>

					<div
						style={{
							position: "absolute",
							bottom: 16,
							right: 16,
							fontSize: 12,
							letterSpacing: "1px",
							color: "#444",
						}}
					>
						BUILD / SHIP
					</div>
				</div>
			</div>

			{/* Footer */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					borderTop: "1px solid #242424",
					paddingTop: 20,
					position: "relative",
				}}
			>
				<div
					style={{
						display: "flex",
						gap: 28,
						fontSize: 15,
						letterSpacing: "1px",
						color: "#555",
					}}
				>
					<span>WEB</span>
					<span>BACKEND</span>
					<span>API</span>
					<span>DATABASE</span>
				</div>

				<div
					style={{
						fontFamily: "Kola",
						fontSize: 20,
						color: "#444",
					}}
				>
					TF.
				</div>
			</div>
		</div>
	);
}
