import { memo, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Flex } from '@/shared/ui/Flex';

interface IAvatarControls {
	size?: 's' | 'm' | 'l' | 'xl';
	circle?: boolean;
	border?: boolean;
	theme?: 'primary' | 'invert';
	onClick?: () => void;
}

interface IAvatarProps extends IAvatarControls {
	src: string;
}

const getSize = (size: IAvatarControls['size']) => {
	if (size === 's') {
		return '50px';
	}

	if (size === 'm') {
		return '85px';
	}

	if (size === 'l') {
		return '100px';
	}

	return '340px';
};

const getBorder = (props: IAvatarControls) => {
	if (!props.border) return 'none';

	return props.theme === 'primary'
		? '3px solid var(--primary-color)'
		: '3px solid var(--invert-primary-color)';
};

const StyledAvatar = styled.img<IAvatarControls>`
	width: ${(props) => getSize(props.size)};
	height: ${(props) => getSize(props.size)};
	border: ${getBorder};
	border-radius: ${(props) => (props.circle ? '50%' : '')};
	cursor: ${(props) => (props.onClick ? 'pointer' : undefined)};
`;

export const Avatar = memo((props: IAvatarProps) => {
	const {
		src,
		circle = false,
		size = 's',
		border = false,
		theme = 'primary',
		onClick,
	} = props;
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		const img = new Image();
		img.src = src ?? '';
		img.onload = () => {
			setIsLoading(false);
		};
	}, [src]);

	if (isLoading) {
		return (
			<Flex width={getSize(size)}>
				<Skeleton
					height={getSize(size)}
					width={getSize(size)}
					circle={circle}
				/>
			</Flex>
		);
	}

	return (
		<StyledAvatar
			border={border}
			theme={theme}
			size={size}
			circle={circle}
			src={src}
			alt={t('Avatar')}
			onClick={onClick}
		/>
	);
});
