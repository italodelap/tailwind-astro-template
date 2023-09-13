import { ShoelaceTheme } from "../types";

import { getSlTheme, setTheme } from "./theme";

export const DEFAULT_THEME = ShoelaceTheme.DARK_THEME;

export function handleSwitcherChange(): void {
	const userPrefersDarkTheme = getSlTheme() === ShoelaceTheme.DARK_THEME;
  setTheme(userPrefersDarkTheme ? ShoelaceTheme.LIGHT_THEME : ShoelaceTheme.DARK_THEME);
}

export function initializeTheme(): void {
	(document.getElementById("theme-switcher") as HTMLButtonElement)!.disabled = false;

	const isDarkThemeSelected = getSlTheme() === ShoelaceTheme.DARK_THEME;
	(document.querySelector(".theme-switcher__icon") as HTMLInputElement).name = isDarkThemeSelected ? "sun" : "moon";
}