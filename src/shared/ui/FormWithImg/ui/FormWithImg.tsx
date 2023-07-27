import React, {
	ChangeEvent,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import SendIcon from '@/shared/assets/send.svg';
import SuccessIcon from '@/shared/assets/check.svg';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';
import { useKeyboardEvent } from '@/shared/hooks/useKeyboardEvent';
import { Carousel } from '@/shared/ui/Carousel';
import { Modal } from '@/shared/ui/Modal';
import { AppImg } from '@/shared/ui/AppImg';
import { NotificationPopover } from '@/shared/ui/NotificationPopover';
import PaperclipIcon from '@/shared/assets/paperclip.svg';
import { fileListToPaths } from '@/shared/helpers/fileListToPaths';
import { Card } from '@/shared/ui/Card';

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
	 * Функция, вызываемая при печати
	 */
	onTyping?: (e: React.KeyboardEvent) => void;
	/**
	 * Текст placeholder текстового инпута
	 */
	textPlaceholder?: string;
	/**
	 * Функция, вызываемая при submit
	 */
	onSubmit?: (data: { text?: string; files?: FileList }) => void;
	/**
	 * Флаг, отвечающий за процесс загрузки
	 */
	isLoading?: boolean;
	/**
	 * Флаг, отвечающий за удачное выполнение submit
	 */
	isSuccess?: boolean;
	/**
	 * Картинки, отображаемые по-умолчанию
	 */
	defaultImages?: Array<string>;
}

interface ISendWithImgFormWithImg extends ISendWithImgFormBase {
	withImg: true;
	defaultImages?: Array<string>;
}

interface ISendWithImgFormWithoutImg extends ISendWithImgFormBase {
	withImg?: false;
	defaultImages?: never;
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

	@media (max-height: 768px) {
		height: ${(props) => (props.small ? '72px' : '100px')};
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

const StyledFileInput = styled.input`
	display: none;
`;

const schema = yup
	.object({
		files: yup.mixed(),
		text: yup.string().default(''),
	})
	.test('at-least-one-filled', '', function (value) {
		return !!value.files || !!value.text;
	});

type Inputs = {
	text: string;
	files: any;
};

export const FormWithImg = memo((props: SendWithImgFormPropsType) => {
	const {
		defaultImages = [],
		onTyping,
		textPlaceholder = '',
		isLoading = false,
		onSubmit,
		isSuccess,
		withImg = false,
		small = false,
		modal = false,
	} = props;
	const isSmallScreen = useMediaQuery({ maxWidth: 768 });
	const isSmallScreenHeight = useMediaQuery({ maxHeight: 768 });
	const { t } = useTranslation();
	const [success, setSuccess] = useState(false);
	const [isFocus, setIsFocus] = useState(false);
	const [shiftPressed, setShiftPressed] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenForm, setIsOpenForm] = useState(false);
	const [images, setImages] = useState<Array<string>>(defaultImages);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const { reset, getValues, control, handleSubmit } = useForm<Inputs>({
		defaultValues: {
			text: '',
			files: undefined,
		},
		resolver: yupResolver(schema),
	});
	const onSubmitHandle: SubmitHandler<Inputs> = useCallback(
		(data) => {
			onSubmit?.(data);
			reset({ text: '', files: undefined });
			setImages([]);
		},
		[onSubmit, reset],
	);

	const {
		onBlurHandle,
		onCloseModal,
		onCloseModalForm,
		onFocus,
		onKeyDownShift,
		onOpenModal,
		onOpenModalForm,
		onKeyUp,
	} = useMemo(
		() => ({
			onOpenModal: () => {
				setIsOpen(true);
			},
			onCloseModal: () => {
				setIsOpen(false);
			},
			onOpenModalForm: () => {
				setIsOpenForm(true);
			},
			onCloseModalForm: () => {
				setIsOpenForm(false);
			},
			onFocus: () => {
				setIsFocus(true);
			},
			onBlurHandle: () => {
				setIsFocus(false);
			},
			onKeyDownShift: () => {
				setShiftPressed(true);
			},
			onKeyUp: () => {
				setShiftPressed(false);
			},
		}),
		[],
	);

	const onAddImg = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const onInputImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const images = fileListToPaths(event.target.files);
		setImages(images);
	}, []);

	const onKeyDownEnter = useCallback(
		(event: KeyboardEvent) => {
			event.preventDefault();

			const data = getValues();
			onSubmitHandle(data);
		},
		[getValues, onSubmitHandle],
	);

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

	const imgForm = useCallback(() => {
		return (
			<>
				<StyledImgWrapper modal={modal}>
					<Flex width="100%" height="100%" gap="16" align="center">
						{images.map((src, index) => (
							<AppImg
								key={index}
								src={src}
								height="80px"
								onClick={onOpenModal}
							/>
						))}
					</Flex>
				</StyledImgWrapper>
				<Modal isOpen={isOpen} onCloseModal={onCloseModal}>
					<Carousel
						carouselWidth="700px"
						carouselHeight="700px"
						imgArray={images}
						customPaging
						keysNav
					/>
				</Modal>
			</>
		);
	}, [images, isOpen, modal, onCloseModal, onOpenModal]);

	return (
		<StyledForm onSubmit={handleSubmit(onSubmitHandle)}>
			<Flex direction="column">
				<Flex>
					<Controller
						name="text"
						control={control}
						render={({ field: { onBlur, ...field } }) => (
							<StyledTextArea
								modal={modal}
								onFocus={onFocus}
								onBlur={() => {
									onBlur();
									onBlurHandle();
								}}
								withImg={withImg}
								placeholder={textPlaceholder}
								onKeyDown={onTyping}
								small={small}
								{...field}
							/>
						)}
					/>
					<StyledBtns>
						{withImg && (
							<NotificationPopover
								notification={images?.length > 0 ? images.length : undefined}
							>
								<Button
									onClick={modal ? onOpenModalForm : onAddImg}
									invert
									width={isSmallScreen || isSmallScreenHeight ? '40px' : '64px'}
									height={
										isSmallScreen || isSmallScreenHeight ? '40px' : '64px'
									}
								>
									<Icon SvgIcon={PaperclipIcon} />
								</Button>
							</NotificationPopover>
						)}
						<Popover
							direction="top_left"
							trigger={
								<Button
									invert
									width={isSmallScreen || isSmallScreenHeight ? '40px' : '64px'}
									height={
										isSmallScreen || isSmallScreenHeight ? '40px' : '64px'
									}
									type="submit"
									disabled={isLoading}
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
								<NotificationPopover
									notification={images?.length > 0 ? images.length : undefined}
								>
									<Button
										onClick={onAddImg}
										invert
										width={
											isSmallScreen || isSmallScreenHeight ? '40px' : '64px'
										}
										height={
											isSmallScreen || isSmallScreenHeight ? '40px' : '64px'
										}
									>
										<Icon SvgIcon={PaperclipIcon} />
									</Button>
								</NotificationPopover>
							</Flex>
						</Card>
					</Modal>
				)}
			</Flex>
			<Controller
				name="files"
				control={control}
				render={({ field: { ref, value, onChange, ...field } }) => (
					<StyledFileInput
						ref={(instance) => {
							ref(instance);
							fileInputRef.current = instance;
						}}
						value={value?.fileName}
						onChange={(event) => {
							onInputImages(event);
							onChange(event.target.files);
						}}
						type="file"
						accept="image/*"
						multiple
						{...field}
					/>
				)}
			/>
		</StyledForm>
	);
});
