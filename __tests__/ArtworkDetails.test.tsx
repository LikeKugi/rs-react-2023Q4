import { afterEach, describe, it, expect } from '@jest/globals';
import { cleanup, render, screen } from '@testing-library/react';
import ArtworkDetails from '@/components/ui/ArtworkDetails/ArtworkDetails';
import { singleResponse } from '@/__tests__/utils/ArtworkDetails.utils';

describe('ArtworkDetails tests', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render component', async function () {
    render(<ArtworkDetails artwork={singleResponse.data} />);
    expect(await screen.findByText(/Melusine/i)).toBeInTheDocument();
    expect(await screen.findByRole('img')).toBeInTheDocument();
    expect(await screen.findByText(/born/i)).toBeInTheDocument();
    expect(await screen.findByText(/1943/)).toBeInTheDocument();
  });
});
