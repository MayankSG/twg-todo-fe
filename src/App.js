import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { checkAuthLoader } from "./utils/auth";
import { logout as logoutAction } from "./pages/authentication/logout";
import RootLayout from "./pages/Root";
import DashboardPage from "./pages/Dashboard";
import SignUpPage from "./pages/authentication/SignUp";
import LoginPage from "./pages/authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <p>Error</p>,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        loader: checkAuthLoader,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },
  {
    path: "logout",
    action: logoutAction,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
