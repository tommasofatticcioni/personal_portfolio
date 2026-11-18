// Replaces next-themes: the theme is a `dark` class on <html>, chosen by the
// inline script in BaseLayout before first paint and stored in localStorage.
import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readTheme(): Theme {
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.style.colorScheme = theme;
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		// Storage can be unavailable (private mode); the theme still applies for this visit.
	}
}

/** Current theme, kept in sync with the class on <html>. Undefined during server rendering. */
export function useResolvedTheme(): Theme | undefined {
	const [theme, setThemeState] = useState<Theme | undefined>(() =>
		typeof document === "undefined" ? undefined : readTheme(),
	);

	useEffect(() => {
		setThemeState(readTheme());
		const observer = new MutationObserver(() => setThemeState(readTheme()));
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return theme;
}
