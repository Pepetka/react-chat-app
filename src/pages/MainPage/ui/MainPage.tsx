import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';
import { Flex } from '@/shared/ui/Flex';

const MainPage = () => {
	const { t } = useTranslation();

	return (
		<Flex data-testid="MainPage" justify="center">
			<Text width="100%" title={t('MainPage')} titleAlign="center" />
		</Flex>
	);
};

export default MainPage;
