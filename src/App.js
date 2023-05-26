import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import AddUser from './components/adduser/AddUser'
import RemovedUsers from './components/removedusers/RemovedUsers'
import Users from './components/users/Users'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <AddUser />
        },
        {
          path: "/users",
          element: <Users />
        },
        {
          path: "/removed-users",
          element: <RemovedUsers />
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
