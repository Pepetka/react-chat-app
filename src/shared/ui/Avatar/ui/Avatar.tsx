import { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface IAvatarControls {
	size?: 's' | 'm' | 'l' | 'xl';
	circle?: boolean;
	border?: boolean;
	theme?: 'primary' | 'invert';
}

interface IAvatarProps extends IAvatarControls {
	img: string;
}

const getSize = (props: IAvatarControls) => {
	if (props.size === 's') {
		return '50px';
	}

	if (props.size === 'm') {
		return '85px';
	}

	if (props.size === 'l') {
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
	width: ${getSize};
	height: ${getSize};
	border: ${getBorder};
	border-radius: ${(props) => (props.circle ? '50%' : '')};
`;

export const Avatar = memo((props: IAvatarProps) => {
	const {
		img,
		circle = false,
		size = 's',
		border = false,
		theme = 'primary',
	} = props;
	const { t } = useTranslation();

	return (
		<StyledAvatar
			border={border}
			theme={theme}
			size={size}
			circle={circle}
			src={img}
			alt={t('Avatar')}
		/>
	);
});
