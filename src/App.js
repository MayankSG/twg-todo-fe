import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const RootLayout = lazy(() => import("./pages/Root"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const SignUpPage = lazy(() => import("./pages/authentication/SignUp"));
const LoginPage = lazy(() => import("./pages/authentication/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
  {
    path: "login",
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense>
        <SignUpPage />
      </Suspense>
    ),
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
