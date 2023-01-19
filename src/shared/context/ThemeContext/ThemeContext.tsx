import { createContext } from 'react';
import { Theme } from '@/shared/const/theme';

interface IThemeContextProps {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<IThemeContextProps>({
	theme: Theme.LIGHT,
	setTheme: () => {},
});
