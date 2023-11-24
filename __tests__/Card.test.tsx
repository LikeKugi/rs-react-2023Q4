import { afterEach, describe, expect, it } from '@jest/globals';
import { cleanup, render, screen } from '@testing-library/react';
import Card from '@/components/ui/Card/Card';
import {
  cardData,
  cardForDefaultSkeleton,
  cardForSkeleton,
} from '@/__tests__/utils/Card.utils';

describe('Card test', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    render(<Card content={cardData.data} link="/" />);
    expect(screen.queryByText(/Melusine/i)).toBeInTheDocument();
    expect(screen.queryByText(/kurt/i)).toBeInTheDocument();
    expect(screen.queryByText(/1943/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeInTheDocument();
  });

  it('should render skeleton when image_id is null', function () {
    render(<Card content={cardForSkeleton} link="/" />);
    expect(screen.getByRole('skeleton')).toBeInTheDocument();
  });

  it('should render default skeleton', function () {
    render(<Card content={cardForDefaultSkeleton} link="/" />);
    expect(screen.getByRole('skeleton')).toBeInTheDocument();
  });
});
