import styled from 'styled-components';
import { memo } from 'react';

interface IThemeProp {
	theme?:
		| 'primary'
		| 'primary-invert'
		| 'error'
		| 'secondary'
		| 'secondary-invert';
}

interface ISizeProp {
	size?: 'm' | 'l' | 'xl';
}

const sizeTextTitle: Record<NonNullable<ISizeProp['size']>, string> = {
	m: 'l',
	l: 'xl',
	xl: 'xxl',
};

interface ITitleControls extends IThemeProp, ISizeProp {
	titleAlign?: 'left' | 'right' | 'center';
}

interface ITextControls extends IThemeProp, ISizeProp {
	textAlign?: 'left' | 'right' | 'center';
}

interface ITextProps extends ITitleControls, ITextControls {
	title?: string;
	text?: string;
	TitleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const getTextColor = (props: ITitleControls) => {
	if (props.theme === 'error') {
		return 'var(--primary-error-color)';
	}

	if (props.theme === 'secondary') {
		return 'var(--secondary-color)';
	}

	if (props.theme === 'secondary-invert') {
		return 'var(--invert-secondary-color)';
	}

	return props.theme === 'primary'
		? 'var(--primary-color)'
		: 'var(--invert-primary-color)';
};

const TextWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const StyledTitle = styled.h1<ITitleControls>`
	font: ${(props) => `var(--font-${sizeTextTitle[props.size!]})`};
	color: ${getTextColor};
	text-align: ${(props) => props.titleAlign};
`;

const StyledText = styled.p<ITextControls>`
	font: ${(props) => `var(--font-${props.size})`};
	color: ${getTextColor};
	text-align: ${(props) => props.textAlign};
`;

export const Text = memo((props: ITextProps) => {
	const {
		text,
		title,
		TitleTag = 'h1',
		textAlign = 'left',
		titleAlign = 'left',
		theme = 'primary',
		size = 'm',
	} = props;

	return (
		<TextWrapper>
			{title && (
				<StyledTitle
					size={size}
					theme={theme}
					titleAlign={titleAlign}
					as={TitleTag}
				>
					{title}
				</StyledTitle>
			)}
			{text && (
				<StyledText size={size} theme={theme} textAlign={textAlign}>
					{text}
				</StyledText>
			)}
		</TextWrapper>
	);
});
