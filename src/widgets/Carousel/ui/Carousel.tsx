import { memo, ReactNode, useCallback, useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';
import { useHover } from '@/shared/hooks/useHover';

interface ICarouselControls {
	carouselWidth?: string;
}

interface ICarouselProps extends ICarouselControls, Settings {
	children: ReactNode;
}

const StyledNavBtn = styled.button<{ name: 'prev' | 'next'; hover: boolean }>`
	display: ${(props) => (props.hover ? 'block' : 'none')};
	border: none;
	background: none;
	width: 50px;
	height: 100%;
	position: absolute;
	right: ${(props) => (props.name === 'next' ? '0' : undefined)};
	left: ${(props) => (props.name === 'prev' ? '0' : undefined)};
	top: 0;
	color: black;
	cursor: pointer;
	z-index: 1;
`;

const StyledNav = styled.div`
	width: 40px;
	height: 40px;
	line-height: 40px;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 50%;
`;

const StyledWrapper = styled.div<ICarouselControls>`
	width: ${(props) => props.carouselWidth};
`;

export const Carousel = memo((props: ICarouselProps) => {
	const { children, carouselWidth = '100%', ...sliderProps } = props;
	const { hover, onMouseOut, onMouseOver } = useHover();

	const NextArrow = useCallback(
		({ onClick }: { onClick: () => void }) => (
			<StyledNavBtn hover={hover} name="next" onClick={onClick}>
				<StyledNav>{'>'}</StyledNav>
			</StyledNavBtn>
		),
		[hover],
	);

	const PrevArrow = useCallback(
		({ onClick }: { onClick: () => void }) => (
			<StyledNavBtn hover={hover} name="prev" onClick={onClick}>
				<StyledNav>{'<'}</StyledNav>
			</StyledNavBtn>
		),
		[hover],
	);

	const settings: Settings = useMemo(
		() => ({
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			lazyLoad: 'progressive',
			arrows: true,
			nextArrow: <NextArrow onClick={() => {}} />,
			prevArrow: <PrevArrow onClick={() => {}} />,
		}),
		[NextArrow, PrevArrow],
	);

	return (
		<StyledWrapper
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			carouselWidth={carouselWidth}
		>
			<Slider {...settings} {...sliderProps}>
				{children}
			</Slider>
		</StyledWrapper>
	);
});
