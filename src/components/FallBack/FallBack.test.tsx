import { describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import FallBack from '@/components/FallBack/FallBack';

describe('<Fallback /> component tests', () => {
  it('should render component', function () {
    render(<FallBack buttonClickHandler={vi.fn()} />);
    expect(screen.queryByText(/wrong/i)).toBeInTheDocument();
  });
  it('should handle click on button', function () {
    const clicker = vi.fn();
    render(<FallBack buttonClickHandler={clicker} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(clicker).toHaveBeenCalled();
  });
});
