import { memo, ReactElement, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

interface IAppImgControls {
	width?: string;
	height?: string;
}

interface IAppImgProps extends IAppImgControls {
	src?: string;
	alt?: string;
	errorFallback?: ReactElement;
}

const StyledImg = styled.img<IAppImgControls>`
	width: ${(props) => props.width ?? 'auto'};
	height: ${(props) => props.height ?? 'auto'};
`;

export const AppImg = memo((props: IAppImgProps) => {
	const {
		src,
		height = 'auto',
		width = 'auto',
		errorFallback,
		alt = 'App image',
	} = props;
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useLayoutEffect(() => {
		const img = new Image();
		img.src = src ?? '';
		img.onload = () => {
			setIsLoading(false);
		};
		img.onerror = () => {
			setIsError(true);
		};
	}, [src]);

	if (isLoading) {
		return (
			<Flex width={width} height={height}>
				<Skeleton height={height} width={width} />
			</Flex>
		);
	}

	if (isError && errorFallback) {
		return (
			<Flex width={width} height={height} justify="center" align="center">
				{errorFallback}
			</Flex>
		);
	}

	return <StyledImg src={src} width={width} height={height} alt={alt} />;
});
