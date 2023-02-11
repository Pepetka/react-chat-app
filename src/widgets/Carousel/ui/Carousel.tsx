import {
	ForwardedRef,
	forwardRef,
	memo,
	ReactNode,
	useCallback,
	useMemo,
} from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';
import { useHover } from '@/shared/hooks/useHover';

interface ICarouselControls {
	carouselWidth?: string;
	carouselHeight?: string;
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

export const Carousel = memo(
	forwardRef((props: ICarouselProps, ref: ForwardedRef<Slider>) => {
		const {
			children,
			carouselWidth = '100%',
			carouselHeight = 'auto',
			...sliderProps
		} = props;
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
				adaptiveHeight: false,
				fade: true,
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
				carouselHeight={carouselHeight}
			>
				<Slider ref={ref} {...settings} {...sliderProps}>
					{children}
				</Slider>
			</StyledWrapper>
		);
	}),
);
