import { JSX } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { RoutesConstants } from '@/constants';
import RootPage from '@/pages/RootPage/RootPage';
import HomePage from '@/pages/HomePage/HomePage';
import UncontrolledFormPage from '@/pages/UncontrolledFormPage/UncontrolledFormPage';
import ControlledFormPage from '@/pages/ControlledFormPage/ControlledFormPage';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RoutesConstants.INDEX} element={<RootPage />}>
      <Route index element={<HomePage />} />
      <Route
        path={RoutesConstants.UNCONTROLLED}
        element={<UncontrolledFormPage />}
      />
      <Route
        path={RoutesConstants.CONTROLLED}
        element={<ControlledFormPage />}
      />
    </Route>,
  ),
);

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={routes} />;
};
export default AppRouter;
