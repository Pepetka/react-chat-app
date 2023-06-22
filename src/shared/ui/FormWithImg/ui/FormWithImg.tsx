import {
	ChangeEvent,
	FormEvent,
	memo,
	useCallback,
	useEffect,
	useState,
} from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import SendIcon from '@/shared/assets/send.svg';
import PaperclipIcon from '@/shared/assets/paperclip.svg';
import SuccessIcon from '@/shared/assets/check.svg';
import LookIcon from '@/shared/assets/look.svg';
import { Icon } from '@/shared/ui/Icon';
import { AppImg } from '@/shared/ui/AppImg';
import { Popover } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';
import { Carousel } from '@/shared/ui/Carousel';
import { Modal } from '@/shared/ui/Modal';
import { useKeyboardEvent } from '@/shared/hooks/useKeyboardEvent';
import { Card } from '@/shared/ui/Card';
import { NotificationPopover } from '@/shared/ui/NotificationPopover';

interface ISendWithImgFormControls {
	/**
	 * Флаг, отвечающий за наличие изображений формы
	 */
	withImg?: boolean;
	/**
	 * Флаг, отвечающий за компактный режим компонента
	 */
	small?: boolean;
	/**
	 * Флаг, отвечающий за наличие модального окна
	 */
	modal?: boolean;
}

interface ISendWithImgFormBase extends ISendWithImgFormControls {
	/**
	 * Значение текстового инпута
	 */
	textValue?: string;
	/**
	 * Функция, вызываемая при изменении значения текстового инпута
	 * @param text - значение текстового инпута
	 */
	onChangeText?: (text: string) => void;
	/**
	 * Текст placeholder текстового инпута
	 */
	textPlaceholder?: string;
	/**
	 * Функция, вызываемая при submit
	 */
	onSubmit?: () => void;
	/**
	 * Флаг, отвечающий за процесс загрузки
	 */
	isLoading?: boolean;
	/**
	 * Флаг, отвечающий за удачное выполнение submit
	 */
	isSuccess?: boolean;
}

interface ISendWithImgFormWithImg extends ISendWithImgFormBase {
	withImg: true;
	/**
	 * Значение инпута изображений
	 */
	imgValue?: string;
	/**
	 * Функция, вызываемая при изменении значения инпута изображений
	 * @param img - Значение инпута изображений
	 */
	onChangeImg?: (img: string) => void;
	/**
	 * Текст placeholder инпута изображений
	 */
	imgPlaceholder?: string;
	/**
	 * Флаг, отвечающий за отображение изображений по умолчанию
	 */
	previewImgDefault?: boolean;
}

interface ISendWithImgFormWithoutImg extends ISendWithImgFormBase {
	withImg?: false;
	imgValue?: never;
	onChangeImg?: never;
	imgPlaceholder?: never;
	previewImgDefault?: never;
}

type SendWithImgFormPropsType =
	| ISendWithImgFormWithImg
	| ISendWithImgFormWithoutImg;

const StyledForm = styled.form`
	width: 100%;
`;

const getPadding = (withImg?: boolean) => {
	if (withImg) {
		if (window.innerWidth > 768) {
			return '10px 176px 10px 10px';
		} else {
			return '10px 128px 10px 10px';
		}
	} else {
		if (window.innerWidth > 768) {
			return '10px 96px 10px 10px';
		} else {
			return '10px 48px 10px 10px';
		}
	}
};

const StyledTextArea = styled.textarea<ISendWithImgFormControls>`
	border: 3px solid var(--invert-primary-color);
	border-bottom: ${(props) =>
		!props.withImg || props.modal ? undefined : 'none'};
	border-radius: ${(props) =>
		!props.withImg || props.modal ? '10px' : '10px 10px 0 0'};
	width: 100%;
	font: var(--font-m);
	height: ${(props) => (props.small ? '96px' : '200px')};
	padding: ${(props) => getPadding(props.withImg)};
	background: var(--invert-bg-color);
	color: var(--invert-primary-color);
	outline: none;
	resize: none;

	&::placeholder {
		font: var(--font-m);
		color: var(--invert-secondary-color);
	}
`;

const StyledImgArea = styled.textarea<ISendWithImgFormControls>`
	font: var(--font-m);
	width: 100%;
	height: 96px;
	border: 3px solid var(--invert-primary-color);
	border-radius: ${(props) =>
		!props.withImg || props.modal ? '10px' : '0 0 10px 10px'};
	padding: 10px;
	background: var(--invert-bg-color);
	color: var(--invert-primary-color);
	outline: none;
	resize: none;

	&::placeholder {
		font: var(--font-m);
		color: var(--invert-secondary-color);
	}
`;

const StyledBtns = styled.div`
	display: flex;
	gap: 16px;
	position: absolute;
	bottom: 16px;
	right: 16px;
`;

const StyledImgWrapper = styled.div<{ modal: boolean }>`
	width: 100%;
	height: 96px;
	border: 3px solid var(--invert-primary-color);
	border-radius: ${(props) => (props.modal ? '10px' : '0 0 10px 10px')};
	padding-inline: 10px;
	background: var(--invert-bg-color);
`;

export const FormWithImg = memo((props: SendWithImgFormPropsType) => {
	const {
		imgValue = '',
		textValue = '',
		onChangeImg,
		onChangeText,
		textPlaceholder = '',
		imgPlaceholder = '',
		isLoading = false,
		onSubmit,
		isSuccess,
		withImg = false,
		previewImgDefault = false,
		small = false,
		modal = false,
	} = props;
	const isSmallScreen = useMediaQuery({ maxWidth: 768 });
	const { t } = useTranslation();
	const [previewImg, setPreviewImg] = useState(previewImgDefault ?? false);
	const [success, setSuccess] = useState(false);
	const [isFocus, setIsFocus] = useState(false);
	const [shiftPressed, setShiftPressed] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenForm, setIsOpenForm] = useState(false);

	const onOpenModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	const onOpenModalForm = useCallback(() => {
		setIsOpenForm(true);
	}, []);

	const onCloseModalForm = useCallback(() => {
		setIsOpenForm(false);
	}, []);

	const onFocus = useCallback(() => {
		setIsFocus(true);
	}, []);

	const onBlur = useCallback(() => {
		setIsFocus(false);
	}, []);

	const onKeyDownShift = useCallback(() => {
		setShiftPressed(true);
	}, []);

	const onKeyDownEnter = useCallback(
		(event: KeyboardEvent) => {
			event.preventDefault();
			onSubmit?.();
		},
		[onSubmit],
	);

	const onKeyUp = useCallback(() => {
		setShiftPressed(false);
	}, []);

	useKeyboardEvent({
		addCondition: isFocus,
		callback: onKeyDownShift,
		event: 'keydown',
		key: 'Shift',
	});

	useKeyboardEvent({
		addCondition: shiftPressed && isFocus,
		callback: onKeyDownEnter,
		event: 'keydown',
		key: 'Enter',
	});

	useKeyboardEvent({
		callback: onKeyUp,
		event: 'keyup',
		key: 'Shift',
	});

	useEffect(() => {
		let timerId: ReturnType<typeof setTimeout>;

		if (isSuccess) {
			setSuccess(true);
			timerId = setTimeout(() => {
				setSuccess(false);
			}, 1000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isSuccess]);

	const onPreviewImg = useCallback(() => {
		setPreviewImg((prev) => !prev);
	}, []);

	const onChangeTextHandle = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
			onChangeText?.(event.target.value);
		},
		[onChangeText],
	);

	const onChangeImgHandle = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
			onChangeImg?.(event.target.value);
		},
		[onChangeImg],
	);

	const onSubmitHandle = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			onSubmit?.();
		},
		[onSubmit],
	);

	const imgForm = useCallback(() => {
		return (
			<>
				{!previewImg || !imgValue ? (
					<StyledImgArea
						modal={modal}
						withImg={withImg}
						placeholder={imgPlaceholder}
						value={imgValue}
						onChange={onChangeImgHandle}
						small={small}
					/>
				) : (
					<StyledImgWrapper modal={modal}>
						<Flex width="100%" height="100%" gap="16" align="center">
							{imgValue.split('\n').map((src, index) => (
								<AppImg
									key={index}
									src={src}
									height="80px"
									onClick={onOpenModal}
								/>
							))}
						</Flex>
					</StyledImgWrapper>
				)}
				<Modal isOpen={isOpen} onCloseModal={onCloseModal}>
					<Carousel
						carouselWidth="700px"
						carouselHeight="700px"
						imgArray={imgValue.split('\n')}
						customPaging
						keysNav
					/>
				</Modal>
			</>
		);
	}, [
		imgPlaceholder,
		imgValue,
		isOpen,
		modal,
		onChangeImgHandle,
		onCloseModal,
		onOpenModal,
		previewImg,
		small,
		withImg,
	]);

	return (
		<StyledForm onSubmit={onSubmitHandle}>
			<Flex direction="column">
				<Flex>
					<StyledTextArea
						modal={modal}
						onFocus={onFocus}
						onBlur={onBlur}
						withImg={withImg}
						placeholder={textPlaceholder}
						value={textValue}
						onChange={onChangeTextHandle}
						small={small}
					/>
					<StyledBtns>
						{withImg && (
							<NotificationPopover
								notification={
									imgValue ? imgValue.split('\n').length : undefined
								}
							>
								<Button
									onClick={modal ? onOpenModalForm : onPreviewImg}
									invert
									width={isSmallScreen ? '40px' : '64px'}
									height={isSmallScreen ? '40px' : '64px'}
								>
									<Icon SvgIcon={PaperclipIcon} />
								</Button>
							</NotificationPopover>
						)}
						<Popover
							direction="top_center"
							trigger={
								<Button
									invert
									width={isSmallScreen ? '40px' : '64px'}
									height={isSmallScreen ? '40px' : '64px'}
									type="submit"
									disabled={isLoading || (!textValue && !imgValue)}
								>
									{isLoading ? (
										'...'
									) : success ? (
										<Icon SvgIcon={SuccessIcon} />
									) : (
										<Icon SvgIcon={SendIcon} />
									)}
								</Button>
							}
						>
							<Text text={t('ShiftEnter')} textAlign="center" width="150px" />
						</Popover>
					</StyledBtns>
				</Flex>
				{withImg && !modal && imgForm()}
				{withImg && modal && (
					<Modal isOpen={isOpenForm} onCloseModal={onCloseModalForm}>
						<Card>
							<Flex direction="column" gap="8" align="flex-end">
								{imgForm()}
								<Button
									theme="primary"
									invert={previewImg}
									width="auto"
									height="auto"
									onClick={onPreviewImg}
								>
									<Icon SvgIcon={LookIcon} size="m" invert={!previewImg} />
								</Button>
							</Flex>
						</Card>
					</Modal>
				)}
			</Flex>
		</StyledForm>
	);
});
