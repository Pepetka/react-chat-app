import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import { useTheme } from '@/shared/hooks/useTheme';

const StyledWrapper = styled.div`
	width: 100vw;
	height: 100dvh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const PageError = memo(() => {
	const { t } = useTranslation();
	const { theme } = useTheme();

	const onReloadPage = useCallback(() => {
		window.location.reload();
	}, []);

	return (
		<StyledWrapper className={`App ${theme}`}>
			<Flex direction="column" gap="16" align="center">
				<Text title={t('Something went wrong')} titleAlign="center" />
				<Button onClick={onReloadPage} height="50px" padding>
					<Text text={t('Reload page')} theme="primary-invert" />
				</Button>
			</Flex>
		</StyledWrapper>
	);
});
