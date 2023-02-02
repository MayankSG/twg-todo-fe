import { lazy, Suspense } from "react";
const Login = lazy(() => import("../../components/authentication/Login"));
function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}

export default LoginPage;
