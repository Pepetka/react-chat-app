import { createContext } from 'react';

interface IResolutionContextProps {
	over768: boolean;
	over992: boolean;
	over1200: boolean;
	setOver768: (value: boolean) => void;
	setOver992: (value: boolean) => void;
	setOver1200: (value: boolean) => void;
}

export const ResolutionContext = createContext<IResolutionContextProps>({
	over768: true,
	over992: true,
	over1200: true,
	setOver768: () => {},
	setOver992: () => {},
	setOver1200: () => {},
});
