import { ReactNode, useMemo, useState } from 'react';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/context/ThemeContext/ThemeContext';

interface IThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
	const [theme, setTheme] = useState(Theme.LIGHT);

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
