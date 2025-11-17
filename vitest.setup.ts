import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// Import Jest-DOM matchers
import '@testing-library/jest-dom/vitest';

// Run cleanup after each test case (e.g., unmount components)
afterEach(() => {
  cleanup();
});