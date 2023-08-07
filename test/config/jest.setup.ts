import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { server } from '../../src/shared/config/test';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
