import { JSX } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { RouterConstants } from '@/routes/RouterConstants';
import RootPage from '@/pages/RootPage/RootPage';
import HomePage from '@/pages/HomePage/HomePage';
import ModalPage from '@/pages/ModalPage/ModalPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import ArtworkDetails from '@/components/ArtworkDetails/ArtworkDetails';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={RouterConstants.INDEX} element={<RootPage />}>
        <Route path={RouterConstants.INDEX} element={<HomePage />}>
          <Route path={RouterConstants.ARTWORKS} element={<ModalPage />}>
            <Route
              path={`${RouterConstants.ARTWORK_ID}`}
              element={<ArtworkDetails />}
            />
          </Route>
        </Route>
        <Route path={RouterConstants.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </>,
  ),
);

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={routes} />;
};
export default AppRouter;
