import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { cleanup, render, screen } from '@testing-library/react';
import { datalist } from '@/__tests__/utils/CardList.utils';
import CardList from '@/components/ui/CardList/CardList';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('CardList tests', () => {
  afterEach(() => {
    cleanup();
  });

  it.each([5, 10, 15])('should render correct number of cards', function (i) {
    const artworks = Array.from({ length: i }, (_, index) => ({
      ...datalist[0],
      id: index,
    }));
    jest.mock('next/router', () => jest.requireActual('next-router-mock'));
    mockRouter.push(`/?limit=${i}&page=1`);
    render(<CardList cards={artworks} />, { wrapper: MemoryRouterProvider });
    expect(screen.getAllByRole('link').length).toBe(i);
  });
});
