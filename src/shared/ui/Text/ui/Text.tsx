import styled from 'styled-components';
import { memo } from 'react';

interface IThemeProp {
	/**
	 * Тема текста
	 */
	theme?:
		| 'primary'
		| 'primary-invert'
		| 'error'
		| 'secondary'
		| 'secondary-invert';
}

export interface ISizeProp {
	/**
	 * Размер текста
	 */
	size?: 's' | 'm' | 'l' | 'xl';
}

const sizeTextTitle: Record<NonNullable<ISizeProp['size']>, string> = {
	s: 'm',
	m: 'l',
	l: 'xl',
	xl: 'xxl',
};

interface ITitleControls extends IThemeProp, ISizeProp {
	titleAlign?: 'left' | 'right' | 'center';
}

interface ITextControls extends IThemeProp, ISizeProp {
	textAlign?: 'left' | 'right' | 'center';
	nowrap?: boolean;
}

interface IWrapperControls {
	width?: string;
}

interface ITextProps extends ITitleControls, ITextControls, IWrapperControls {
	title?: string;
	text?: string;
	TitleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
	'data-testid'?: string;
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

const TextWrapper = styled.div<IWrapperControls>`
	width: ${(props) => props.width ?? 'auto'};
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
	white-space: ${(props) => (props.nowrap ? 'nowrap' : undefined)};
	overflow: hidden;
	text-overflow: ellipsis;
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
		width = '100%',
		nowrap = false,
		'data-testid': dataTestId,
	} = props;

	return (
		<TextWrapper width={width} data-testid={dataTestId}>
			{title && (
				<StyledTitle
					data-testid={`${dataTestId}.title`}
					size={size}
					theme={theme}
					titleAlign={titleAlign}
					as={TitleTag}
				>
					{title}
				</StyledTitle>
			)}
			{text &&
				text.split('\n').map((line, index) => (
					<StyledText
						data-testid={`${dataTestId}.text${index}` || ''}
						key={index}
						nowrap={nowrap}
						size={size}
						theme={theme}
						textAlign={textAlign}
					>
						{line}
					</StyledText>
				))}
		</TextWrapper>
	);
});
