import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

const NotFoundPage = memo(() => {
	const { t } = useTranslation();

	return (
		<Flex data-testid="NotFoundPage">
			<Text title={t('Page not found')} titleAlign="center" />
		</Flex>
	);
});

export default NotFoundPage;
