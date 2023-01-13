import {
	ChangeEvent,
	HTMLInputTypeAttribute,
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
	focused: boolean;
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

const StyledInput = styled.input<IInputControls>`
	font: var(--font-m);
	height: auto;
	padding: 10px;
	width: ${(props) => props.width};
	border-radius: 5px;
	border: ${(props) =>
		props.theme === 'primary'
			? '1px solid var(--primary-color)'
			: '1px solid var(--invert-primary-color)'};
	background: ${(props) =>
		props.theme === 'primary' ? 'var(--bg-color)' : 'var(--invert-bg-color)'};
	color: ${(props) =>
		props.theme === 'primary'
			? 'var(--primary-color)'
			: 'var(--invert-primary-color)'};
	outline: none;
`;

const StyledLabel = styled.div<ILabelControls>`
	font: var(--font-m);
	position: absolute;
	padding-inline: 10px;
	top: ${(props) => (props.focused ? '0' : '20px')};
	left: ${(props) => (props.focused ? '5px' : '10px')};
	background: ${(props) =>
		props.theme === 'primary' ? 'var(--bg-color)' : 'var(--invert-bg-color)'};
	color: ${(props) =>
		props.theme === 'primary'
			? 'var(--primary-color)'
			: 'var(--invert-primary-color)'};
	transition: all linear 0.2s;
	pointer-events: none;
`;

const StyledWrapper = styled.div`
	position: relative;
	padding-top: 10px;
`;

export const Input = (props: IInputProps) => {
	const {
		width,
		label,
		onChange,
		theme = 'primary',
		name,
		required = false,
		type = 'text',
	} = props;
	const [focused, setFocused] = useState(false);

	const { onFocus, onBlur } = useMemo(
		() => ({
			onFocus: () => setFocused(true),
			onBlur: () => setFocused(false),
		}),
		[],
	);

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
			/>
			<StyledLabel theme={theme} focused={focused}>
				{label}
			</StyledLabel>
		</StyledWrapper>
	);
};
