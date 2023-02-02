import { lazy, Suspense } from "react";

const SignUp = lazy(() => import("../../components/authentication/SignUp"));

function SignUpPage() {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  );
}

export default SignUpPage;
