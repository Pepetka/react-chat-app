import { Component, ErrorInfo, ReactNode } from 'react';
import { PageError } from '@/widgets/PageError';

interface IErrorBoundaryProps {
	children: ReactNode;
}

interface IErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends Component<
	IErrorBoundaryProps,
	IErrorBoundaryState
> {
	constructor(props: IErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): IErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.log(error, info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			return <PageError />;
		}

		return this.props.children;
	}
}
