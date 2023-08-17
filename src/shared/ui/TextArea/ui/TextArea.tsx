import {
	ChangeEvent,
	FC,
	FocusEvent,
	forwardRef,
	memo,
	SVGProps,
	TextareaHTMLAttributes,
	useCallback,
	useEffect,
	useState,
} from 'react';
import styled from 'styled-components';

interface ITextAreaControls {
	/**
	 * Высота инпута
	 */
	height?: string;
	/**
	 * Тема компонента
	 */
	theme?: 'primary' | 'invert';
	/**
	 * Флаг, отвечающий за наличие ошибки
	 */
	error?: boolean;
	/**
	 * Значение border-radius
	 */
	borderRadius?: string;
	/**
	 * Значение padding-inline
	 */
	paddingInline?: string;
	/**
	 * Флаг, отвечающий за наличие border
	 */
	border?: boolean;
	/**
	 * Svg изображение submit кнопки
	 */
	SvgIcon?: FC<SVGProps<SVGSVGElement>>;
}

interface ILabelControls {
	/**
	 * Флаг, отвечающий за наличие ошибки
	 */
	error?: boolean;
	/**
	 * Флаг, отвечающий за открытое состояние плавающего лейбла
	 */
	opened: boolean;
	/**
	 * Тема компонента
	 */
	theme: 'primary' | 'invert';
	/**
	 * Значение padding-inline
	 */
	paddingInline?: string;
}

interface ITextAreaProps
	extends ITextAreaControls,
		Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'height' | 'onChange'> {
	/**
	 * Текст плавающего лейбла
	 */
	label?: string;
	/**
	 * Функция, вызываемая при изменении значения инпута
	 * @param value - значение инпута
	 */
	onChange: (value: string) => void;
	/**
	 * Ширина инпута
	 */
	width: string;
	/**
	 * Функция, вызываемая при submit
	 */
	onClick?: () => void;
	/**
	 * Id для тестирования
	 */
	'data-testid'?: string;
}

const getBgColor = (props: ITextAreaControls | ILabelControls) =>
	props.theme === 'primary' ? 'var(--bg-color)' : 'var(--invert-bg-color)';

const StyledTextarea = styled.textarea<ITextAreaControls>`
	font: var(--font-m);
	height: ${(props) => props.height};
	width: 100%;
	padding: ${(props) =>
		`10px ${props.SvgIcon ? '50px' : props.paddingInline} 10px ${
			props.paddingInline
		} `};
	border-radius: ${(props) => props.borderRadius};
	border: ${(props) => {
		if (props.error) {
			return '4px solid var(--primary-error-color)';
		}

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
	color: ${(props) => {
		if (props.error) {
			return 'var(--primary-error-color)';
		}

		return props.theme === 'primary'
			? 'var(--secondary-color)'
			: 'var(--invert-secondary-color)';
	}};
	transition: all linear 0.2s;
	pointer-events: none;
`;

const StyledWrapper = styled.div<{ width: string; label?: string }>`
	position: relative;
	padding-top: ${(props) => (props.label ? '10px' : '0')};
	width: ${(props) => props.width};
`;

export const TextArea = memo(
	forwardRef<HTMLTextAreaElement, ITextAreaProps>(
		(props: ITextAreaProps, forwardedRef) => {
			const {
				error,
				width,
				label,
				onChange,
				theme = 'primary',
				name,
				required = false,
				borderRadius = '8px',
				height = 'auto',
				paddingInline = '10px',
				value,
				SvgIcon,
				border = true,
				'data-testid': dataTestId,
				onBlur,
				...otherProps
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

			const onFocusHandle = useCallback(() => {
				setFocused(true);
			}, []);

			const onBlurHandle = useCallback(
				(event: FocusEvent<HTMLTextAreaElement>) => {
					setFocused(false);
					onBlur?.(event);
				},
				[onBlur],
			);

			const onHandleChange = useCallback(
				(event: ChangeEvent<HTMLTextAreaElement>) => {
					onChange(event.target.value);
				},
				[onChange],
			);

			return (
				<StyledWrapper width={width} label={label}>
					<StyledTextarea
						ref={forwardedRef}
						error={error}
						name={name}
						required={required}
						theme={theme}
						height={height}
						onFocus={onFocusHandle}
						onBlur={onBlurHandle}
						onChange={onHandleChange}
						value={value}
						borderRadius={borderRadius}
						paddingInline={paddingInline}
						border={border}
						SvgIcon={SvgIcon}
						data-testid={dataTestId}
						{...otherProps}
					/>
					{label && (
						<StyledLabel
							error={error}
							paddingInline={paddingInline}
							theme={theme}
							opened={opened}
						>
							{label}
						</StyledLabel>
					)}
				</StyledWrapper>
			);
		},
	),
);
