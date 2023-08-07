import {
	ImgHTMLAttributes,
	memo,
	useCallback,
	useLayoutEffect,
	useState,
} from 'react';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import errorFallback from '@/shared/assets/images/fallback.jpg';

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
	/**
	 * Флаг, отвечающий за занятие компонентом всего контейнера
	 */
	full?: boolean;
	/**
	 * Функция, выполняемая при загрузке изображения
	 * @param width - ширина изображения
	 * @param height - высота изображения
	 */
	onLoadImg?: ({ width, height }: { width: number; height: number }) => void;
}

interface IAppImgProps
	extends IAppImgControls,
		Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'onClick'> {}

const StyledImg = styled.img<IAppImgControls>`
	width: auto;
	height: auto;
	max-width: ${(props) => props.width ?? 'auto'};
	max-height: ${(props) => props.height ?? 'auto'};
	cursor: ${(props) => (props.onClick ? 'pointer' : undefined)};
	object-fit: cover;
`;

export const AppImg = memo((props: IAppImgProps) => {
	const {
		src,
		height = 'auto',
		width = 'auto',
		alt = 'App image',
		onLoadImg,
		full,
		onClick,
		...otherProps
	} = props;
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const getImgSize = useCallback(() => {
		if (full) {
			return {
				width: window.innerWidth >= window.innerHeight ? 'auto' : '100vw',
				height: window.innerWidth > window.innerHeight ? '100dvh' : 'auto',
			};
		}

		return {
			width,
			height,
		};
	}, [full, width, height]);

	useLayoutEffect(() => {
		const img = new Image();
		img.src = src ?? '';
		img.onload = () => {
			setIsError(false);
			setIsLoading(false);
			onLoadImg?.({ width: img.width, height: img.height });
		};
		img.onerror = () => {
			setIsError(true);
			setIsLoading(false);
		};
	}, [onLoadImg, src]);

	if (isError) {
		return (
			<StyledImg
				onClick={onClick}
				src={errorFallback}
				width={getImgSize().width}
				height={getImgSize().height}
				alt={alt}
				{...otherProps}
			/>
		);
	}

	if (isLoading) {
		return (
			<Flex
				width={
					getImgSize().width === 'auto'
						? getImgSize().height
						: getImgSize().width
				}
				height={
					getImgSize().height === 'auto'
						? getImgSize().width
						: getImgSize().height
				}
			>
				<Skeleton height="100%" width="100%" />
			</Flex>
		);
	}

	return (
		<StyledImg
			onClick={onClick}
			src={src}
			width={getImgSize().width}
			height={getImgSize().height}
			alt={alt}
			{...otherProps}
		/>
	);
});
