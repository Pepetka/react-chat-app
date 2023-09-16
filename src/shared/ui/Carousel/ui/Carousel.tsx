import { memo, ReactNode, useCallback, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { useHover } from '@/shared/hooks/useHover';
import { Flex } from '@/shared/ui/Flex';
import { AppImg } from '@/shared/ui/AppImg';
import { Button } from '@/shared/ui/Button';
import { useKeyboardEvent } from '@/shared/hooks/useKeyboardEvent';

interface ICarouselControls {
	/**
	 * Ширина компонента
	 */
	carouselWidth?: string;
	/**
	 * Высота компонента
	 */
	carouselHeight?: string;
	/**
	 * Флаг, отвечающий за занятие компонентом всего контейнера
	 */
	full?: boolean;
}

interface ICarouselProps
	extends ICarouselControls,
		Omit<Settings, 'customPaging'> {
	imgArray: Array<string>;
	alt?: string;
	onImgClick?: () => void;
	customPaging?: boolean;
	keysNav?: boolean;
}

const StyledNavBtn = styled.button<{
	name: 'prev' | 'next';
	hover: boolean;
	customPaging: boolean;
}>`
	display: ${(props) => (props.hover ? 'block' : 'none')};
	border: none;
	background: none;
	width: 50px;
	height: ${(props) => (props.customPaging ? 'calc(100% - 70px)' : '100%')};
	position: absolute;
	right: ${(props) => (props.name === 'next' ? '0' : undefined)};
	left: ${(props) => (props.name === 'prev' ? '0' : undefined)};
	top: 0;
	color: white;
	cursor: pointer;
	z-index: var(--popup-z);
`;

const StyledNav = styled.div`
	width: 40px;
	height: 40px;
	line-height: 40px;
	background: var(--overlay-color);
	border-radius: 50%;
`;

const StyledWrapper = styled.div<ICarouselControls>`
	width: ${(props) => props.carouselWidth};
	height: ${(props) => props.carouselHeight};
	margin-bottom: 10px;
`;

const imgPaging =
	(imgArray: Array<string>): Settings['customPaging'] =>
	(i: number) =>
		(
			<Button aria-label="Carousel pagination" theme="clear">
				<AppImg src={imgArray[i]} width="auto" height="70px" />
			</Button>
		);

const imgDots: Settings['appendDots'] = (dots: ReactNode) => (
	<Flex height="70px" gap="4" justify="center" align="center" FlexTag="ul">
		{dots}
	</Flex>
);

const NextArrow = ({
	onClick,
	hover,
	customPaging,
}: {
	onClick?: () => void;
	hover: boolean;
	customPaging: boolean;
}) => (
	<StyledNavBtn
		customPaging={customPaging}
		hover={hover}
		name="next"
		onClick={onClick}
	>
		<StyledNav>{'>'}</StyledNav>
	</StyledNavBtn>
);

const PrevArrow = ({
	onClick,
	hover,
	customPaging,
}: {
	onClick?: () => void;
	hover: boolean;
	customPaging: boolean;
}) => (
	<StyledNavBtn
		customPaging={customPaging}
		hover={hover}
		name="prev"
		onClick={onClick}
	>
		<StyledNav>{'<'}</StyledNav>
	</StyledNavBtn>
);

const settings = (
	imgArray: Array<string>,
	hover: boolean,
	customPaging: boolean,
): Settings => {
	const paging = customPaging
		? {
				appendDots: imgDots,
				customPaging: imgPaging(imgArray),
		  }
		: {};

	return {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: false,
		fade: !isMobile,
		arrows: !isMobile,
		nextArrow: <NextArrow hover={hover} customPaging={customPaging} />,
		prevArrow: <PrevArrow hover={hover} customPaging={customPaging} />,
		...paging,
	};
};

export const Carousel = memo((props: ICarouselProps) => {
	const {
		imgArray,
		carouselWidth = '100%',
		carouselHeight = 'auto',
		alt,
		onImgClick,
		customPaging = false,
		keysNav = false,
		full,
		...sliderProps
	} = props;
	const { hover, onMouseOut, onMouseOver } = useHover();
	const [maxHeightRatio, setMaxHeightRatio] = useState(1);
	const sliderRef = useRef<Slider | null>(null);

	const onNextSlide = useCallback(() => {
		sliderRef.current?.slickNext();
	}, []);

	const onPrevSlide = useCallback(() => {
		sliderRef.current?.slickPrev();
	}, []);

	const onLoadImg = useCallback(
		({ width, height }: { width: number; height: number }) => {
			if (Math.floor(height / width) > maxHeightRatio) {
				setMaxHeightRatio(Math.floor(height / width));
				console.log(Math.floor(height / width));
			}
		},
		[maxHeightRatio],
	);

	useKeyboardEvent({
		callback: onNextSlide,
		event: 'keydown',
		key: 'ArrowRight',
		addCondition: keysNav,
	});

	useKeyboardEvent({
		callback: onPrevSlide,
		event: 'keydown',
		key: 'ArrowLeft',
		addCondition: keysNav,
	});

	const getImgSize = useCallback(() => {
		if (full) {
			return {
				carouselWidth:
					window.innerWidth >= window.innerHeight ? '100dvh' : '100vw',
				carouselHeight:
					window.innerHeight > window.innerWidth
						? 'calc(100vw - 70px)'
						: 'calc(100dvh - 70px)',
				wrapperWidth:
					window.innerWidth >= window.innerHeight ? '100dvh' : '100vw',
				wrapperHeight:
					window.innerHeight > window.innerWidth ? '100wh' : '100dvh',
			};
		}

		return {
			carouselWidth,
			carouselHeight,
			wrapperWidth: carouselWidth,
			wrapperHeight: carouselHeight,
		};
	}, [full, carouselWidth, carouselHeight]);

	return (
		<StyledWrapper
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			carouselWidth={getImgSize().wrapperWidth}
			carouselHeight={getImgSize().wrapperHeight}
		>
			<Slider
				ref={sliderRef}
				{...settings(imgArray, hover, customPaging)}
				{...sliderProps}
			>
				{imgArray.map((src, index) => (
					<Flex
						key={index}
						height={getImgSize().carouselHeight}
						width={getImgSize().carouselWidth}
						align="center"
						justify="center"
					>
						<AppImg
							onLoadImg={onLoadImg}
							width={getImgSize().carouselWidth}
							height={getImgSize().carouselHeight}
							src={src}
							alt={alt}
							onClick={onImgClick}
						/>
					</Flex>
				))}
			</Slider>
		</StyledWrapper>
	);
});
