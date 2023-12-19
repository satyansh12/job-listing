import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import EditJob from './pages/editJob';
import Job from './pages/job/index.element';
import AddJob from './pages/addJob';
import jobLoader from './pages/job/index.loader';
import ErrorElement from './pages/ErrorElement';
import AuthLayout from './pages/auth/AuthLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        path: 'jobs',
        children: [
          { path: 'post', element: <AddJob /> },
          {
            path: ':id',
            children: [
              { index: true, element: <Job />, loader: jobLoader },
              { path: 'edit', element: <EditJob /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
