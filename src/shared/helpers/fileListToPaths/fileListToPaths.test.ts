import { describe, expect, test } from '@jest/globals';
import { fileListToPaths } from './fileListToPaths';

describe('fileListToPaths', () => {
	test('fileList to paths', () => {
		const mockFileList = [
			new File(['Test 1'], 'test1.txt', { type: 'text/plain' }),
			new File(['Test 2'], 'test2.txt', { type: 'text/plain' }),
		];
		const mockObjectURLs = [
			'blob:http://example.com/file1',
			'blob:http://example.com/file2',
		];

		window.URL.createObjectURL = jest.fn((file: File) => {
			const index = mockFileList.indexOf(file);
			return mockObjectURLs[index];
		});

		const result = fileListToPaths(mockFileList);
		expect(result).toEqual(mockObjectURLs);
	});
});
