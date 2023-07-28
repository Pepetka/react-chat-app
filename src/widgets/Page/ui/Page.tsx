import { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { isMobile, BrowserView, MobileView } from 'react-device-detect';
import {
	getLoginPagePath,
	getMessengerPagePath,
	getRegisterPagePath,
} from '@/shared/const/router';
import { SideBar } from '@/widgets/SideBar';
import { Flex } from '@/shared/ui/Flex';
import { BottomBar } from '@/widgets/BottomBar';

interface IPageProps {
	children: ReactNode;
	currentPagePath: string;
}

const StyledPage = styled.div<{ noAuthPage: boolean }>`
	height: ${(props) =>
		isMobile && props.noAuthPage
			? 'var(--page-height-mobile)'
			: 'var(--page-height)'};
	overflow-y: auto;
	overflow-x: hidden;
`;

const ContentWrapper = styled.div<{ isMessengerPage: boolean }>`
	width: 80%;
	min-height: ${() =>
		isMobile ? 'var(--page-height-mobile)' : 'var(--page-height)'};
	margin-inline: auto;
	padding-bottom: ${(props) =>
		props.isMessengerPage && isMobile ? '0' : 'var(--page-padding)'};
	display: flex;
	gap: 8px;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const Page = (props: IPageProps) => {
	const { children, currentPagePath } = props;

	const isNoAuthPage = useMemo(
		() =>
			currentPagePath !== getLoginPagePath() &&
			currentPagePath !== getRegisterPagePath(),
		[currentPagePath],
	);

	const isMessengerPage = useMemo(
		() => currentPagePath.includes(getMessengerPagePath('')),
		[currentPagePath],
	);

	return (
		<>
			<StyledPage data-scroll noAuthPage={isNoAuthPage}>
				<ContentWrapper isMessengerPage={isMessengerPage}>
					{isNoAuthPage && (
						<BrowserView>
							<SideBar />
						</BrowserView>
					)}
					<Flex
						width={isMobile || !isNoAuthPage ? '100%' : 'calc(100% - 170px)'}
						justify="center"
					>
						{children}
					</Flex>
				</ContentWrapper>
			</StyledPage>
			{isNoAuthPage && (
				<MobileView>
					<BottomBar currentPagePath={currentPagePath} />
				</MobileView>
			)}
		</>
	);
};
