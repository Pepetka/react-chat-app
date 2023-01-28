import { useCallback, useContext } from 'react';
import { ThemeContext } from '@/shared/context/ThemeContext/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

interface IUseThemeReturn {
	theme: Theme;
	changeTheme: () => void;
	setTheme: (theme: Theme) => void;
}

export const useTheme = (): IUseThemeReturn => {
	const { theme, setTheme } = useContext(ThemeContext);

	const changeTheme = useCallback(() => {
		const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);

		setTheme(newTheme);
	}, [setTheme, theme]);

	return {
		theme,
		changeTheme,
		setTheme,
	};
};
