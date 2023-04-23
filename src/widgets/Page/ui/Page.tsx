import { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { isMobile, MobileView, BrowserView } from 'react-device-detect';
import { getLoginPagePath, getRegisterPagePath } from '@/shared/const/router';
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
			? 'calc(100vh - var(--navbar-height) * 2)'
			: 'calc(100vh - var(--navbar-height))'};
	overflow-y: auto;
	overflow-x: hidden;
`;

const ContentWrapper = styled.div`
	width: 80%;
	min-height: ${() =>
		isMobile
			? 'calc(100vh - var(--navbar-height) * 2)'
			: 'calc(100vh - var(--navbar-height))'};
	margin-inline: auto;
	padding-bottom: var(--page-padding);
	display: flex;
	gap: 8px;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const Page = (props: IPageProps) => {
	const { children, currentPagePath } = props;

	const noAuthPage = useMemo(
		() =>
			currentPagePath !== getLoginPagePath() &&
			currentPagePath !== getRegisterPagePath(),
		[currentPagePath],
	);

	return (
		<>
			<StyledPage noAuthPage={noAuthPage}>
				<ContentWrapper>
					{noAuthPage && (
						<BrowserView>
							<SideBar />
						</BrowserView>
					)}
					<Flex width={isMobile ? '100%' : 'calc(100% - 170px)'}>
						{children}
					</Flex>
				</ContentWrapper>
			</StyledPage>
			{noAuthPage && (
				<MobileView>
					<BottomBar currentPagePath={currentPagePath} />
				</MobileView>
			)}
		</>
	);
};
