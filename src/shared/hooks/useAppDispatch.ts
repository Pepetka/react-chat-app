import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/provider/Store';

/**
 * Типизированный dispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
