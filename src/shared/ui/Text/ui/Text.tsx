import styled from 'styled-components';

interface ITitleControls {
	titleAlign?: 'left' | 'right' | 'center';
}

interface ITextControls {
	textAlign?: 'left' | 'right' | 'center';
}

interface ITextProps extends ITitleControls, ITextControls {
	title?: string;
	text?: string;
	TitleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const TextWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const StyledTitle = styled.h1<ITitleControls>`
	font: var(--font-l);
	color: var(--primary-color);
	text-align: ${(props) => props.titleAlign};
`;

const StyledText = styled.p<ITextControls>`
	font: var(--font-m);
	color: var(--secondary-color);
	text-align: ${(props) => props.textAlign};
`;

export const Text = (props: ITextProps) => {
	const {
		text,
		title,
		TitleTag = 'h1',
		textAlign = 'left',
		titleAlign = 'left',
	} = props;

	return (
		<TextWrapper>
			{title && (
				<StyledTitle titleAlign={titleAlign} as={TitleTag}>
					{title}
				</StyledTitle>
			)}
			{text && <StyledText textAlign={textAlign}>{text}</StyledText>}
		</TextWrapper>
	);
};
