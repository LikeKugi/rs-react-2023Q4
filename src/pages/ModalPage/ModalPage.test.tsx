import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import {
  BrowserRouter,
  MemoryRouter,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import ModalPage from '@/pages/ModalPage/ModalPage';

describe('<ModalPage /> tests', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render component', function () {
    render(
      <BrowserRouter>
        <ModalPage />
      </BrowserRouter>,
    );
    expect(screen.getByText(/close/i)).toBeInTheDocument();
  });

  it('should close modal by click on the button', function () {
    render(
      <MemoryRouter initialEntries={['/modal/']}>
        <Routes>
          <Route
            path={'/'}
            element={
              <div>
                <h1>component</h1>
                <Outlet />
              </div>
            }
          >
            <Route path={'modal'} element={<ModalPage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const closeBtn = screen.getByText(/close/i);
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/close/i)).toBeNull();
  });

  it('should close modal by click on wrapper', function () {
    render(
      <MemoryRouter initialEntries={['/modal/']}>
        <Routes>
          <Route
            path={'/'}
            element={
              <div>
                <h1>component</h1>
                <Outlet />
              </div>
            }
          >
            <Route path={'modal'} element={<ModalPage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const divWrapper = screen.getByRole('wrapper');
    expect(divWrapper).toBeInTheDocument();
    fireEvent.click(divWrapper);
    expect(screen.queryByRole('wrapper')).toBeNull();
  });
});
