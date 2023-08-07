import { describe, expect, test } from '@jest/globals';
import { addZeros } from './addZeros';

describe('addZeros', () => {
	test('add zero', () => {
		for (let i = 0; i < 10; i++) {
			expect(addZeros(i)).toEqual(`0${i}`);
		}

		expect(addZeros(10)).toEqual(`10`);
	});
});
