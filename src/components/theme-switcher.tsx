import { useTheme } from "@heroui/use-theme";

export const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div>
			The current theme is: {theme}
			<button type="button" onClick={() => setTheme("light")}>
				Light Mode
			</button>
			<button type="button" onClick={() => setTheme("dark")}>
				Dark Mode
			</button>
		</div>
	);
};
