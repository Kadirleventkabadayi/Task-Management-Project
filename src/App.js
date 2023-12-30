import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import { UserProvider } from "./components/UserContex";
import DutyPage from "./pages/DutyPage";
import AdminPage from "./pages/AdminPage";
import EmployeeLoginPage from "./pages/EmployeeLoginPage";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/a",
          element: <DutyPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/signin",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/esignin",
      element: <EmployeeLoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={myRouter} />
    </UserProvider>
  );
}

export default App;
