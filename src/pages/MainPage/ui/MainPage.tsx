import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';

const MainPage = () => {
	const { t } = useTranslation();

	return <Text title={t('MainPage')} titleAlign="center" />;
};

export default MainPage;
