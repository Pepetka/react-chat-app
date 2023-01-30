import { memo, ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

interface ICarouselControls {
	carouselWidth?: string;
}

interface ICarouselProps extends ICarouselControls, Settings {
	children: ReactNode;
}

const StyledNavBtn = styled.button<{ name: 'prev' | 'next' }>`
	width: 30px;
	height: 30px;
	background: var(--secondary-color);
	border: none;
	border-radius: 50%;
	position: absolute;
	right: ${(props) => (props.name === 'next' ? '-50px' : undefined)};
	left: ${(props) => (props.name === 'prev' ? '-50px' : undefined)};
	top: 50%;
	cursor: pointer;
`;

const NextArrow = ({ onClick }: { onClick: () => void }) => (
	<StyledNavBtn name="next" onClick={onClick}>
		{'>'}
	</StyledNavBtn>
);

const PrevArrow = ({ onClick }: { onClick: () => void }) => (
	<StyledNavBtn name="prev" onClick={onClick}>
		{'<'}
	</StyledNavBtn>
);

const settings: Settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	adaptiveHeight: true,
	arrows: false,
	nextArrow: <NextArrow onClick={() => {}} />,
	prevArrow: <PrevArrow onClick={() => {}} />,
};

const StyledWrapper = styled.div<ICarouselControls>`
	width: ${(props) => props.carouselWidth};
`;

export const Carousel = memo((props: ICarouselProps) => {
	const { children, carouselWidth = '100%', ...sliderProps } = props;

	return (
		<StyledWrapper carouselWidth={carouselWidth}>
			<Slider {...settings} {...sliderProps}>
				{children}
			</Slider>
		</StyledWrapper>
	);
});
