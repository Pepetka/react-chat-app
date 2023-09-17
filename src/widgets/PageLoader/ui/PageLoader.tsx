import { memo } from 'react';
import { Spinner } from '@/shared/ui/Spinner';
import { Flex } from '@/shared/ui/Flex';

interface IPageLoaderProps {
	theme?: 'invert' | 'primary';
}

export const PageLoader = memo((props: IPageLoaderProps) => {
	const { theme } = props;

	return (
		<Flex width="100%" height="100%" justify="center" align="center">
			<Spinner theme={theme} />
		</Flex>
	);
});
