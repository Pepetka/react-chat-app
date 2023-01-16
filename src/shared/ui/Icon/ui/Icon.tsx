import { FC, memo, SVGProps } from 'react';
import styled from 'styled-components';

interface IIconControls {
	invert?: boolean;
}

interface IIconProps extends IIconControls {
	SvgIcon: FC<SVGProps<SVGSVGElement>>;
}

const Logo = styled.div<IIconControls>`
	color: ${(props) =>
		props.invert ? 'var(--invert-primary-color)' : 'var(--primary-color)'};
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Icon = memo((props: IIconProps) => {
	const { SvgIcon, invert = false } = props;

	return (
		<Logo invert={invert}>
			<SvgIcon />
		</Logo>
	);
});
