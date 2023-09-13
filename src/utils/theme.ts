import { ShoelaceTheme } from "../types";

export function getSlTheme(): ShoelaceTheme {
	return localStorage.getItem("sl-theme") as ShoelaceTheme;
}

export function getThemeSwitcher(): null | HTMLButtonElement {
	const slButton = document.getElementById("theme-switcher");
	if (!slButton) { return null; }

	return slButton.shadowRoot!.querySelector("button") as HTMLButtonElement;
}

export function getUserPreferredTheme(): ShoelaceTheme {
	const userPreferredTheme = getSlTheme();
	if (userPreferredTheme) {
		return userPreferredTheme;
	}

	const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

	return prefersDarkMode ? ShoelaceTheme.DARK_THEME : ShoelaceTheme.LIGHT_THEME;
}

export function setTheme(theme: ShoelaceTheme): void {
	const htmlTag = document.querySelector("html") as HTMLHtmlElement;
	const themeMetaTag = document.head.querySelector("meta[name='theme-color']");
	const iconThemeSwitcher = document.querySelector(".theme-switcher__icon") as HTMLInputElement;

	const isDarkThemeSelected = theme === ShoelaceTheme.DARK_THEME;
	iconThemeSwitcher!.name = isDarkThemeSelected ? "sun" : "moon";

	let metaTagContent: "#f5f5f5" | "#171717";
	if (isDarkThemeSelected) {
		metaTagContent = "#171717";
		htmlTag.classList.add("sl-theme-dark");
	} else {
		metaTagContent = "#f5f5f5";
		htmlTag.classList.remove("sl-theme-dark");
	}

	// @ts-ignore
	if (themeMetaTag) { themeMetaTag.content = metaTagContent; }

	localStorage.setItem("sl-theme", theme);
}

export async function whenThemeSwitcherDefined(): Promise<void> {
	await customElements.whenDefined("sl-button");
}
