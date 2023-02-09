import { FC, memo, SVGProps } from 'react';
import styled from 'styled-components';

interface IIconControls {
	invert?: boolean;
	size?: 's' | 'm' | 'l';
}

interface IIconProps extends IIconControls {
	SvgIcon: FC<SVGProps<SVGSVGElement>>;
}

const sizeObject: Record<NonNullable<IIconControls['size']>, string> = {
	s: '32px',
	m: '48px',
	l: '64px',
};

const Logo = styled.div<IIconControls>`
	width: ${(props) => sizeObject[props.size!]};
	height: ${(props) => sizeObject[props.size!]};
	color: ${(props) =>
		props.invert ? 'var(--invert-primary-color)' : 'var(--primary-color)'};
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Icon = memo((props: IIconProps) => {
	const { SvgIcon, invert = false, size = 'm' } = props;

	return (
		<Logo size={size} invert={invert}>
			<SvgIcon />
		</Logo>
	);
});
