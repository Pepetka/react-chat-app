import { ChangeEvent, memo, useCallback } from 'react';
import styled from 'styled-components';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import SendIcon from '@/shared/assets/send.svg';
import PaperclipIcon from '@/shared/assets/paperclip.svg';
import { Icon } from '@/shared/ui/Icon';

interface ISendWithImgFormProps {
	textValue?: string;
	imgValue?: string;
	onChangeText?: (text: string) => void;
	onChangeImg?: (img: string) => void;
	textPlaceholder?: string;
	imgPlaceholder?: string;
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
`;

const StyledInput = styled.input`
	font: var(--font-m);
	width: calc(100% - 154px);
	height: 64px;
	border: 3px solid var(--invert-primary-color);
	border-radius: 10px;
	padding: 10px;
	background: var(--invert-bg-color);
	color: var(--invert-primary-color);
	outline: none;
`;

const StyledBtns = styled.div`
	display: flex;
	gap: 16px;
	position: absolute;
	top: 0;
	right: 0;
`;

export const SendWithImgForm = memo((props: ISendWithImgFormProps) => {
	const {
		imgValue = '',
		textValue = '',
		onChangeImg,
		onChangeText,
		textPlaceholder = '',
		imgPlaceholder = '',
	} = props;

	const onChangeTextHandle = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
			onChangeText?.(event.target.value);
		},
		[onChangeText],
	);

	const onChangeImgHandle = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onChangeImg?.(event.target.value);
		},
		[onChangeImg],
	);

	return (
		<Card width="100%">
			<StyledForm>
				<StyledTextArea
					placeholder={textPlaceholder}
					value={textValue}
					onChange={onChangeTextHandle}
				/>
				<Flex gap="16">
					<StyledInput
						placeholder={imgPlaceholder}
						value={imgValue}
						onChange={onChangeImgHandle}
					/>
					<StyledBtns>
						<Button invert width="64px" height="64px">
							<Icon SvgIcon={PaperclipIcon} />
						</Button>
						<Button invert width="64px" height="64px">
							<Icon SvgIcon={SendIcon} />
						</Button>
					</StyledBtns>
				</Flex>
			</StyledForm>
		</Card>
	);
});
