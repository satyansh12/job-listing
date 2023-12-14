import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
