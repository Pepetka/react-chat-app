import { memo } from 'react';
import { Spinner } from '@/shared/ui/Spinner';
import { Flex } from '@/shared/ui/Flex';

export const PageLoader = memo(() => {
	return (
		<Flex
			width="100%"
			height="calc(100vh - var(--navbar-height) - var(--page-padding))"
			justify="center"
			align="center"
		>
			<Spinner />
		</Flex>
	);
});
