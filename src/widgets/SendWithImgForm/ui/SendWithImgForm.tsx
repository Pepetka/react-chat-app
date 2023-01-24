import { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import SendIcon from '@/shared/assets/send.svg';
import PaperclipIcon from '@/shared/assets/paperclip.svg';
import { Icon } from '@/shared/ui/Icon';
import { AppImg } from '@/shared/ui/AppImg';
import { Spinner } from '@/shared/ui/Spinner';

interface ISendWithImgFormProps {
	textValue?: string;
	imgValue?: string;
	onChangeText?: (text: string) => void;
	onChangeImg?: (img: string) => void;
	textPlaceholder?: string;
	imgPlaceholder?: string;
	onSubmit?: () => void;
	isLoading?: boolean;
}

const StyledForm = styled.form`
	width: 100%;
	position: relative;
`;

const StyledTextArea = styled.textarea`
	border: 3px solid var(--invert-primary-color);
	border-radius: 10px;
	width: 100%;
	font: var(--font-m);
	min-height: 200px;
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

const StyledImgArea = styled.textarea`
	font: var(--font-m);
	width: calc(100% - 154px);
	height: 64px;
	border: 3px solid var(--invert-primary-color);
	border-radius: 10px;
	padding: 16px 10px;
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
	top: 0;
	right: 0;
`;

const StyledImgWrapper = styled.div`
	width: calc(100% - 154px);
	height: 64px;
	border-left: 3px solid var(--invert-primary-color);
	border-right: 3px solid var(--invert-primary-color);
	border-radius: 10px;
	padding-inline: 10px;
	background: var(--invert-bg-color);
`;

export const SendWithImgForm = memo((props: ISendWithImgFormProps) => {
	const {
		imgValue = '',
		textValue = '',
		onChangeImg,
		onChangeText,
		textPlaceholder = '',
		imgPlaceholder = '',
		isLoading = false,
		onSubmit,
	} = props;
	const [previewImg, setPreviewImg] = useState(false);

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

	return (
		<Card width="100%">
			<StyledForm onSubmit={onSubmitHandle}>
				<Flex direction="column" gap="16">
					<StyledTextArea
						placeholder={textPlaceholder}
						value={textValue}
						onChange={onChangeTextHandle}
						required
					/>
					<Flex justify="space-between" align="center">
						{!previewImg || !imgValue ? (
							<StyledImgArea
								placeholder={imgPlaceholder}
								value={imgValue}
								onChange={onChangeImgHandle}
							/>
						) : (
							<StyledImgWrapper>
								<Flex width="100%" height="100%" gap="16">
									{imgValue.split('\n').map((img, index) => (
										<AppImg key={index} src={img} height="64px" />
									))}
								</Flex>
							</StyledImgWrapper>
						)}
						<StyledBtns>
							<Button onClick={onPreviewImg} invert width="64px" height="64px">
								<Icon SvgIcon={PaperclipIcon} />
							</Button>
							<Button
								invert
								width="64px"
								height="64px"
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? <Spinner /> : <Icon SvgIcon={SendIcon} />}
							</Button>
						</StyledBtns>
					</Flex>
				</Flex>
			</StyledForm>
		</Card>
	);
});
