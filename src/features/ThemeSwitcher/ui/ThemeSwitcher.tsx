import { memo, useCallback } from 'react';
import { Button } from '@/shared/ui/Button';
import { useTheme } from '@/shared/hooks/useTheme';
import { Icon } from '@/shared/ui/Icon';
import SunIcon from '@/shared/assets/sun.svg';
import MoonIcon from '@/shared/assets/moon.svg';
import { Flex } from '@/shared/ui/Flex';
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
			data-testid="ThemeSwitcher.button"
			width="50px"
			height="50px"
			circle
			onClick={onChangeTheme}
			theme={theme}
			invert={invert}
		>
			<Flex
				data-testid={`ThemeSwitcher.${appTheme}`}
				height="100%"
				justify="center"
				align="center"
			>
				<Icon
					SvgIcon={appTheme === Theme.LIGHT ? MoonIcon : SunIcon}
					invert={!invert}
					size="s"
				/>
			</Flex>
		</Button>
	);
});
