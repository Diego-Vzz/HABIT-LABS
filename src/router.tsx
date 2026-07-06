import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import { ROUTES } from './shared/lib/constants/routes';
import ErrorPage from './views/ErrorPage';

const Rutinas = lazy(() => import('./views/Rutinas'));
const PRTool = lazy(() => import('./views/PRTool'));
const CrearPlan = lazy(() => import('./views/CrearPlan'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Cargando inicio...</div>}>
            <Rutinas />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PR_TOOL,
        element: (
          <Suspense fallback={<div>Cargando PR Tool...</div>}>
            <PRTool />
          </Suspense>
        )
      },
      {
        path: ROUTES.CREAR_PLAN,
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <CrearPlan />
          </Suspense>
        )
      }
    ],
  },
]);