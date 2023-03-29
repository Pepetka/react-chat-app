import {
	ImgHTMLAttributes,
	memo,
	ReactElement,
	useLayoutEffect,
	useState,
} from 'react';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

interface IAppImgControls
	extends Pick<ImgHTMLAttributes<HTMLImageElement>, 'onClick'> {
	/**
	 * Ширина компонента
	 */
	width?: string;
	/**
	 * Высота компонента
	 */
	height?: string;
}

interface IAppImgProps
	extends IAppImgControls,
		Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'onClick'> {
	/**
	 * Элемент, отображаемый при ошибке
	 */
	errorFallback?: ReactElement;
}

const StyledImg = styled.img<IAppImgControls>`
	width: ${(props) => props.width ?? 'auto'};
	height: ${(props) => props.height ?? 'auto'};
	cursor: ${(props) => (props.onClick ? 'pointer' : undefined)};
`;

export const AppImg = memo((props: IAppImgProps) => {
	const {
		src,
		height = 'auto',
		width = 'auto',
		errorFallback,
		alt = 'App image',
		onClick,
		...otherProps
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
			<Flex
				width={width === 'auto' ? height : width}
				height={height === 'auto' ? width : height}
			>
				<Skeleton height="100%" width="100%" />
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

	return (
		<StyledImg
			onClick={onClick}
			src={src}
			width={width}
			height={height}
			alt={alt}
			{...otherProps}
		/>
	);
});
