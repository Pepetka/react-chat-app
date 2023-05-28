import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { Spinner } from '@/shared/ui/Spinner';
import { Flex } from '@/shared/ui/Flex';

export const PageLoader = memo(() => {
	return (
		<Flex
			width="100%"
			height={isMobile ? 'var(--page-height-mobile)' : 'var(--page-height)'}
			justify="center"
			align="center"
		>
			<Spinner />
		</Flex>
	);
});
