import { ReactNode } from 'react';
import styled from 'styled-components';
import { getLoginPagePath, getRegisterPagePath } from '@/shared/const/router';
import { SideBar } from '@/widgets/SideBar';

interface IPageProps {
	children: ReactNode;
	currentPagePath: string;
}

const StyledPage = styled.div`
	height: calc(100vh - var(--navbar-height));
	overflow-y: auto;
`;

const ContentWrapper = styled.div`
	width: 80%;
	min-height: calc(100vh - var(--navbar-height));
	margin-inline: auto;
	padding-bottom: 50px;
	display: flex;
	gap: 8px;
`;

export const Page = (props: IPageProps) => {
	const { children, currentPagePath } = props;

	return (
		<StyledPage>
			<ContentWrapper>
				{currentPagePath !== getLoginPagePath() &&
					currentPagePath !== getRegisterPagePath() && <SideBar />}
				{children}
			</ContentWrapper>
		</StyledPage>
	);
};
