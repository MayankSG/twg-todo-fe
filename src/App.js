import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const RootLayout = lazy(() => import("./pages/Root"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const SignUpPage = lazy(() => import("./pages/authentication/SignUp"));
const LoginPage = lazy(() => import("./pages/authentication/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>Loading....</p>}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: <p>Error</p>,
    children: [{ path: "/", index: true, element: <DashboardPage /> }],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<p>Loading....</p>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<p>Loading....</p>}>
        <SignUpPage />
      </Suspense>
    ),
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
