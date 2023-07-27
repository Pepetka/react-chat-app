import { ImgHTMLAttributes, memo, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Flex } from '@/shared/ui/Flex';
import fallbackImg from '@/shared/assets/images/fallback.jpg';

interface IAvatarControls
	extends Pick<ImgHTMLAttributes<HTMLImageElement>, 'onClick'> {
	/**
	 * Размер аватара
	 */
	size?: 's' | 'm' | 'l' | 'xl';
	/**
	 * Флаг, отвечающий за округлую форму компонента
	 */
	circle?: boolean;
	/**
	 * Флаг, отвечающий за наличие border
	 */
	border?: boolean;
	/**
	 * Тема компонента
	 */
	theme?: 'primary' | 'invert';
}

interface IAvatarProps
	extends IAvatarControls,
		Omit<ImgHTMLAttributes<HTMLImageElement>, 'onClick'> {}

const getSize = (size: IAvatarControls['size'], isDesktopOrLaptop: boolean) => {
	if (size === 's') {
		return '50px';
	}

	if (size === 'm') {
		return '85px';
	}

	if (size === 'l') {
		return '100px';
	}

	if (isDesktopOrLaptop) {
		return '340px';
	} else {
		return '250px';
	}
};

const getBorder = (props: IAvatarControls) => {
	if (!props.border) return 'none';

	return props.theme === 'primary'
		? '3px solid var(--primary-color)'
		: '3px solid var(--invert-primary-color)';
};

const StyledAvatar = styled.img<
	IAvatarControls & { isDesktopOrLaptop: boolean }
>`
	width: ${(props) => getSize(props.size, props.isDesktopOrLaptop)};
	height: ${(props) => getSize(props.size, props.isDesktopOrLaptop)};
	border: ${getBorder};
	border-radius: ${(props) => (props.circle ? '50%' : '')};
	cursor: ${(props) => (props.onClick ? 'pointer' : undefined)};
	object-fit: cover;
`;

export const Avatar = memo((props: IAvatarProps) => {
	const {
		src,
		circle = false,
		size = 's',
		border = false,
		theme = 'primary',
		...otherProps
	} = props;
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
	const { t } = useTranslation();
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

	if (isError) {
		return (
			<StyledAvatar
				isDesktopOrLaptop={isDesktopOrLaptop}
				border={border}
				theme={theme}
				size={size}
				circle={circle}
				src={fallbackImg}
				alt={t('Avatar')}
				{...otherProps}
			/>
		);
	}

	if (isLoading) {
		return (
			<Flex width={getSize(size, isDesktopOrLaptop)}>
				<Skeleton
					height={getSize(size, isDesktopOrLaptop)}
					width={getSize(size, isDesktopOrLaptop)}
					circle={circle}
				/>
			</Flex>
		);
	}

	return (
		<StyledAvatar
			isDesktopOrLaptop={isDesktopOrLaptop}
			border={border}
			theme={theme}
			size={size}
			circle={circle}
			src={src}
			alt={t('Avatar')}
			{...otherProps}
		/>
	);
});
