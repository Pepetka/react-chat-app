import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Lang } from '@/shared/config/i18next/i18n';
import { Text } from '@/shared/ui/Text';

interface ILangSwitcherProps {
	theme?: 'primary' | 'outline';
	invert?: boolean;
}

export const LangSwitcher = memo((props: ILangSwitcherProps) => {
	const { i18n } = useTranslation();
	const { theme = 'primary', invert = false } = props;

	const onChangeLang = useCallback(() => {
		i18n.changeLanguage(i18n.language === Lang.RU ? Lang.EN : Lang.RU);
	}, [i18n]);

	return (
		<Button
			width="50px"
			height="50px"
			circle
			onClick={onChangeLang}
			theme={theme}
			invert={invert}
		>
			<Text
				textAlign="center"
				text={i18n.language}
				size="l"
				theme={invert ? 'primary' : 'primary-invert'}
			/>
		</Button>
	);
});
