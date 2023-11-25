import { afterEach, describe, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Card from '@/components/Card/Card';
import {
  cardData,
  cardForDefaultSkeleton,
  cardForSkeleton,
} from '@/components/Card/Card.test-mocks';
import { BrowserRouter } from 'react-router-dom';

describe('<Card /> component tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the relevant card data', function () {
    render(
      <BrowserRouter>
        <Card content={cardData.data} />
      </BrowserRouter>,
    );
    expect(screen.queryByText(/Melusine/i)).toBeInTheDocument();
    expect(screen.queryByText(/kurt/i)).toBeInTheDocument();
    expect(screen.queryByText(/1943/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeInTheDocument();
  });

  it('should render skeleton when image_id is null', function () {
    render(
      <BrowserRouter>
        <Card content={cardForSkeleton} />
      </BrowserRouter>,
    );
    expect(screen.getByRole('skeleton')).toBeInTheDocument();
  });

  it('should render default skeleton', function () {
    render(
      <BrowserRouter>
        <Card content={cardForDefaultSkeleton} />
      </BrowserRouter>,
    );
    expect(screen.getByRole('skeleton')).toBeInTheDocument();
  });
});
