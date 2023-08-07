import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Lang } from '@/shared/const/locales';

interface ILangSwitcherProps {
	theme?: 'primary' | 'outline';
	invert?: boolean;
}

export const LangSwitcher = memo((props: ILangSwitcherProps) => {
	const { i18n } = useTranslation();
	const { theme = 'primary', invert = false } = props;

	const onChangeLang = useCallback(async () => {
		await i18n.changeLanguage(i18n.language === Lang.RU ? Lang.EN : Lang.RU);
	}, [i18n]);

	return (
		<Button
			data-testid="LangSwitcher.button"
			width="50px"
			height="50px"
			circle
			onClick={onChangeLang}
			theme={theme}
			invert={invert}
		>
			<Text
				data-testid={`LangSwitcher.${i18n.language}`}
				textAlign="center"
				text={i18n.language}
				size="l"
				theme={invert ? 'primary' : 'primary-invert'}
			/>
		</Button>
	);
});
