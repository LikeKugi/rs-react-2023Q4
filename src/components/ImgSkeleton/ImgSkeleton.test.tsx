import { afterEach, describe, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import ImgSkeleton from '@/components/ImgSkeleton/ImgSkeleton';

describe('<ImgSkeleton /> tests component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    render(<ImgSkeleton h={10} l={15} s={20} percentage={57} />);
    expect(screen.getByRole('skeleton')).toBeInTheDocument();
  });
});
