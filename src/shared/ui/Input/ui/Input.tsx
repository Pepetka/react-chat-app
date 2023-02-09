import {
	ChangeEvent,
	FC,
	HTMLInputTypeAttribute,
	memo,
	SVGProps,
	useCallback,
	useEffect,
	useState,
} from 'react';
import styled from 'styled-components';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';

interface IInputControls {
	height?: string;
	theme?: 'primary' | 'invert';
	borderRadius?: string;
	paddingInline?: string;
	border?: boolean;
	SvgIcon?: FC<SVGProps<SVGSVGElement>>;
}

interface ILabelControls {
	opened: boolean;
	theme: 'primary' | 'invert';
	paddingInline?: string;
}

interface IInputProps extends IInputControls {
	label?: string;
	value: string;
	onChange: (value: string) => void;
	name: string;
	type?: HTMLInputTypeAttribute;
	required?: boolean;
	width: string;
	onClick?: () => void;
}

const getBgColor = (props: IInputControls | ILabelControls) =>
	props.theme === 'primary' ? 'var(--bg-color)' : 'var(--invert-bg-color)';

const StyledInput = styled.input<IInputControls>`
	font: var(--font-m);
	height: ${(props) => props.height};
	width: 100%;
	padding: ${(props) =>
		`10px ${props.SvgIcon ? '50px' : props.paddingInline} 10px ${
			props.paddingInline
		} `};
	border-radius: ${(props) => props.borderRadius};
	border: ${(props) => {
		if (!props.border) {
			return 'none';
		}

		return props.theme === 'primary'
			? '4px solid var(--primary-color)'
			: '4px solid var(--invert-primary-color)';
	}};
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

const StyledWrapper = styled.div<{ width: string; label?: string }>`
	position: relative;
	padding-top: ${(props) => (props.label ? '10px' : '0')};
	width: ${(props) => props.width};
`;

const StyledBtnWrapper = styled.div<{ label?: string }>`
	position: absolute;
	right: 0;
	top: ${(props) => (props.label ? '8px' : '4px')};
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
		SvgIcon,
		border = true,
		onClick,
	} = props;
	const [focused, setFocused] = useState(false);
	const [opened, setOpened] = useState(false);

	useEffect(() => {
		if (value || focused) {
			setOpened(true);
		} else {
			setOpened(false);
		}
	}, [focused, value]);

	const onFocus = useCallback(() => {
		setFocused(true);
	}, []);

	const onBlur = useCallback(() => {
		setFocused(false);
	}, []);

	const onHandleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.value);
		},
		[onChange],
	);

	return (
		<StyledWrapper width={width} label={label}>
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
				border={border}
				SvgIcon={SvgIcon}
			/>
			{SvgIcon && (
				<StyledBtnWrapper label={label}>
					<Button onClick={onClick} theme="clear">
						<Icon invert={theme === 'invert'} SvgIcon={SvgIcon} />
					</Button>
				</StyledBtnWrapper>
			)}
			{label && (
				<StyledLabel
					paddingInline={paddingInline}
					theme={theme}
					opened={opened}
				>
					{label}
				</StyledLabel>
			)}
		</StyledWrapper>
	);
});
