import {
	ChangeEvent,
	FormEvent,
	memo,
	useCallback,
	useEffect,
	useState,
} from 'react';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import SendIcon from '@/shared/assets/send.svg';
import PaperclipIcon from '@/shared/assets/paperclip.svg';
import SuccessIcon from '@/shared/assets/check.svg';
import { Icon } from '@/shared/ui/Icon';
import { AppImg } from '@/shared/ui/AppImg';
import { Popover } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { Carousel } from '@/widgets/Carousel';
import { Modal } from '@/shared/ui/Modal';
import { useKeyboardEvent } from '@/shared/hooks/useKeyboardEvent';

interface ISendWithImgFormControls {
	withImg?: boolean;
}

interface ISendWithImgFormBase extends ISendWithImgFormControls {
	textValue?: string;
	onChangeText?: (text: string) => void;
	textPlaceholder?: string;
	onSubmit?: () => void;
	isLoading?: boolean;
	isSuccess?: boolean;
}

interface ISendWithImgFormWithImg extends ISendWithImgFormBase {
	withImg: true;
	imgValue?: string;
	onChangeImg?: (img: string) => void;
	imgPlaceholder?: string;
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

const StyledTextArea = styled.textarea<ISendWithImgFormControls>`
	border: 3px solid var(--invert-primary-color);
	border-bottom: ${(props) => (!props.withImg ? undefined : 'none')};
	border-radius: ${(props) => (!props.withImg ? '10px' : '10px 10px 0 0')};
	width: 100%;
	font: var(--font-m);
	height: 200px;
	padding: ${(props) =>
		!props.withImg ? '10px 96px 10px 10px' : '10px 176px 10px 10px'};
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
	border-radius: ${(props) => (!props.withImg ? '10px' : '0 0 10px 10px')};
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

const StyledImgWrapper = styled.div`
	width: 100%;
	height: 96px;
	border: 3px solid var(--invert-primary-color);
	border-radius: 0 0 10px 10px;
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
	} = props;
	const { t } = useTranslation();
	const [previewImg, setPreviewImg] = useState(previewImgDefault ?? false);
	const [success, setSuccess] = useState(false);
	const [isFocus, setIsFocus] = useState(false);
	const [shiftPressed, setShiftPressed] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const onOpenModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
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
						withImg={withImg}
						placeholder={imgPlaceholder}
						value={imgValue}
						onChange={onChangeImgHandle}
					/>
				) : (
					<StyledImgWrapper>
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
					<Carousel carouselWidth="700px" carouselHeight="700px">
						{imgValue.split('\n').map((src, index) => (
							<Flex key={index} height="700px" align="center">
								<AppImg width="700px" src={src} />
							</Flex>
						))}
					</Carousel>
				</Modal>
			</>
		);
	}, [
		imgPlaceholder,
		imgValue,
		isOpen,
		onChangeImgHandle,
		onCloseModal,
		onOpenModal,
		previewImg,
		withImg,
	]);

	return (
		<StyledForm onSubmit={onSubmitHandle}>
			<Flex direction="column">
				<Flex>
					<StyledTextArea
						onFocus={onFocus}
						onBlur={onBlur}
						withImg={withImg}
						placeholder={textPlaceholder}
						value={textValue}
						onChange={onChangeTextHandle}
					/>
					<StyledBtns>
						{withImg && (
							<Button onClick={onPreviewImg} invert width="64px" height="64px">
								<Icon SvgIcon={PaperclipIcon} />
							</Button>
						)}
						<Popover
							direction="top_center"
							trigger={
								<Button
									invert
									width="64px"
									height="64px"
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
				{withImg && imgForm()}
			</Flex>
		</StyledForm>
	);
});
