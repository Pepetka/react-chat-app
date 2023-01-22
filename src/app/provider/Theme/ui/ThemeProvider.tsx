import { ReactNode, useMemo, useState } from 'react';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/context/ThemeContext/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

interface IThemeProviderProps {
	children: ReactNode;
}

const localTheme =
	(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) ?? Theme.LIGHT;

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(localTheme);

	const themeValue = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme],
	);

	return (
		<ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
	);
};
