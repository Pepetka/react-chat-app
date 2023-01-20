import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
	const { t } = useTranslation();

	return <Text title={t('MainPage')} titleAlign="center" />;
};

export default MainPage;
