import {
	ChangeEvent,
	HTMLInputTypeAttribute,
	memo,
	useCallback,
	useMemo,
	useState,
} from 'react';
import styled from 'styled-components';

interface IInputControls {
	width: string;
	theme?: 'primary' | 'invert';
}

interface ILabelControls {
	opened: boolean;
	theme: 'primary' | 'invert';
}

interface IInputProps extends IInputControls {
	label: string;
	value: string;
	onChange: (value: string) => void;
	name: string;
	type?: HTMLInputTypeAttribute;
	required?: boolean;
}

const getBgColor = (props: IInputControls | ILabelControls) =>
	props.theme === 'primary' ? 'var(--bg-color)' : 'var(--invert-bg-color)';

const getTextColor = (props: IInputControls | ILabelControls) =>
	props.theme === 'primary'
		? 'var(--primary-color)'
		: 'var(--invert-primary-color)';

const StyledInput = styled.input<IInputControls>`
	font: var(--font-m);
	height: auto;
	padding: 10px;
	width: ${(props) => props.width};
	border-radius: 8px;
	border: ${(props) =>
		props.theme === 'primary'
			? '4px solid var(--primary-color)'
			: '4px solid var(--invert-primary-color)'};
	background: ${getBgColor};
	color: ${getTextColor};
	outline: none;

	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus {
		-webkit-text-fill-color: ${getTextColor};
		-webkit-box-shadow: 0 0 0 1000px ${getBgColor} inset;
		transition: background-color 5000s ease-in-out 0s;
	}
`;

const StyledLabel = styled.div<ILabelControls>`
	font: var(--font-m);
	position: absolute;
	padding-inline: 10px;
	top: ${(props) => (props.opened ? '0' : '24px')};
	left: 10px;
	background: ${getBgColor};
	color: ${getTextColor};
	transition: all linear 0.2s;
	pointer-events: none;
`;

const StyledWrapper = styled.div`
	position: relative;
	padding-top: 10px;
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
		<StyledWrapper>
			<StyledInput
				name={name}
				type={type}
				required={required}
				theme={theme}
				width={width}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onHandleChange}
				value={value}
			/>
			<StyledLabel theme={theme} opened={opened}>
				{label}
			</StyledLabel>
		</StyledWrapper>
	);
});
