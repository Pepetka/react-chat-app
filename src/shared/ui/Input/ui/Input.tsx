import {
	ChangeEvent,
	HTMLInputTypeAttribute,
	memo,
	useCallback,
	useState,
} from 'react';
import styled from 'styled-components';

interface IInputControls {
	height?: string;
	theme?: 'primary' | 'invert';
	borderRadius?: string;
	paddingInline?: string;
}

interface ILabelControls {
	opened: boolean;
	theme: 'primary' | 'invert';
	paddingInline?: string;
}

interface IInputProps extends IInputControls {
	label: string;
	value: string;
	onChange: (value: string) => void;
	name: string;
	type?: HTMLInputTypeAttribute;
	required?: boolean;
	width: string;
}

const getBgColor = (props: IInputControls | ILabelControls) =>
	props.theme === 'primary' ? 'var(--bg-color)' : 'var(--invert-bg-color)';

const StyledInput = styled.input<IInputControls>`
	font: var(--font-m);
	height: ${(props) => props.height};
	width: 100%;
	padding: ${(props) => `10px ${props.paddingInline}`};
	border-radius: ${(props) => props.borderRadius};
	border: ${(props) =>
		props.theme === 'primary'
			? '4px solid var(--primary-color)'
			: '4px solid var(--invert-primary-color)'};
	background: ${getBgColor};
	color: ${(props) =>
		props.theme === 'primary'
			? 'var(--primary-color)'
			: 'var(--invert-primary-color)'};
	outline: none;

	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus {
		-webkit-text-fill-color: ${(props) =>
			props.theme === 'primary'
				? 'var(--primary-color)'
				: 'var(--invert-primary-color)'};
		-webkit-box-shadow: 0 0 0 1000px ${getBgColor} inset;
		transition: background-color 5000s ease-in-out 0s;
	}
`;

const StyledLabel = styled.div<ILabelControls>`
	font: var(--font-m);
	position: absolute;
	padding-inline: 10px;
	top: ${(props) => (props.opened ? '0' : '24px')};
	left: ${(props) => props.paddingInline};
	background: ${getBgColor};
	color: ${(props) =>
		props.theme === 'primary'
			? 'var(--secondary-color)'
			: 'var(--invert-secondary-color)'};
	transition: all linear 0.2s;
	pointer-events: none;
`;

const StyledWrapper = styled.div<{ width: string }>`
	position: relative;
	padding-top: 10px;
	width: ${(props) => props.width};
`;

export const Input = memo((props: IInputProps) => {
	const {
		width,
		label,
		onChange,
		theme = 'primary',
		name,
		required = false,
		type = 'text',
		borderRadius = '8px',
		height = 'auto',
		paddingInline = '10px',
		value,
	} = props;
	const [opened, setOpened] = useState(false);

	const onFocus = useCallback(() => {
		setOpened(true);
	}, []);

	const onBlur = useCallback(() => {
		if (!value) {
			setOpened(false);
		}
	}, [value]);

	const onHandleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.value);
		},
		[onChange],
	);

	return (
		<StyledWrapper width={width}>
			<StyledInput
				name={name}
				type={type}
				required={required}
				theme={theme}
				height={height}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onHandleChange}
				value={value}
				borderRadius={borderRadius}
				paddingInline={paddingInline}
			/>
			<StyledLabel paddingInline={paddingInline} theme={theme} opened={opened}>
				{label}
			</StyledLabel>
		</StyledWrapper>
	);
});
