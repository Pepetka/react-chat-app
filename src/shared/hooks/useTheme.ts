import { useCallback, useContext } from 'react';
import { ThemeContext } from '@/shared/context/ThemeContext/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

interface IUseThemeReturn {
	/**
	 * Тема приложения
	 */
	theme: Theme;
	/**
	 * Функция, меняющая тему по определенному правилу
	 */
	changeTheme: () => void;
	/**
	 * Функция, меняющая тему на переданную
	 * @param theme - тема, на которую необходимо сменить тему приложения
	 */
	setTheme: (theme: Theme) => void;
}

/**
 * Хук, возвращающий объект, описываемый типом IUseThemeReturn
 */
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
