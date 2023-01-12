import {
	InputHTMLAttributes,
	useCallback,
	useMemo,
	useRef,
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

interface IInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'width' | 'height'>,
		IInputControls {
	label: string;
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
	padding-inline: 5px;
	top: ${(props) => (props.focused ? '0' : '20px')};
	left: ${(props) => (props.focused ? '5px' : '10px')};
	background: ${(props) =>
		props.theme === 'primary' ? 'var(--bg-color)' : 'var(--invert-bg-color)'};
	color: ${(props) =>
		props.theme === 'primary'
			? 'var(--primary-color)'
			: 'var(--invert-primary-color)'};
	transition: all linear 0.2s;
`;

const StyledWrapper = styled.div`
	position: relative;
	padding-top: 10px;
`;

export const Input = (props: IInputProps) => {
	const { width, label, theme = 'primary' } = props;
	const [focused, setFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { onFocus, onBlur } = useMemo(
		() => ({
			onFocus: () => setFocused(true),
			onBlur: () => setFocused(false),
		}),
		[],
	);

	const onLabelClick = useCallback(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<StyledWrapper>
			<StyledInput
				theme={theme}
				width={width}
				onFocus={onFocus}
				onBlur={onBlur}
				ref={inputRef}
			/>
			<StyledLabel theme={theme} onClick={onLabelClick} focused={focused}>
				{label}
			</StyledLabel>
		</StyledWrapper>
	);
};
