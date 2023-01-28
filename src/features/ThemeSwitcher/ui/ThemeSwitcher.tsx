import { Button } from '@/shared/ui/Button';
import { memo, useCallback } from 'react';
import { Text } from '@/shared/ui/Text';
import { useTheme } from '@/shared/hooks/useTheme';
import { Theme } from '@/shared/const/theme';

interface ILangSwitcherProps {
	theme?: 'primary' | 'outline';
	invert?: boolean;
}

export const ThemeSwitcher = memo((props: ILangSwitcherProps) => {
	const { theme = 'primary', invert = false } = props;
	const { changeTheme, theme: appTheme } = useTheme();

	const onChangeTheme = useCallback(() => {
		changeTheme();
	}, [changeTheme]);

	return (
		<Button
			width="50px"
			height="50px"
			circle
			onClick={onChangeTheme}
			theme={theme}
			invert={invert}
		>
			<Text
				textAlign="center"
				text={appTheme === Theme.LIGHT ? 'Light' : 'Dark'}
				size="m"
				theme={invert ? 'primary' : 'primary-invert'}
			/>
		</Button>
	);
});
