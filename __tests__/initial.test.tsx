import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

describe('initial tests', () => {
  it('should work tests', function () {
    expect(true).toBeTruthy();
  });
  it('should work jsdom', function () {
    render(<h1>Test</h1>);
    expect(screen.queryByText(/test/i)).toBeInTheDocument();
  });
});
