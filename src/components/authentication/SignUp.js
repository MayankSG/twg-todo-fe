import { NavLink } from "react-router-dom";
import SignUpForm from "./SignUpForm";

function SignUp() {
  return (
    <body class="">
      <main class="main-content  mt-0">
        <section>
          <div class="page-header min-vh-100">
            <div class="container">
              <div class="row">
                <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                  <div
                    class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                    style={{
                      backgroundImage:
                        "url('../assets/img/illustrations/illustration-signup.jpg')",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
                <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                  <div class="card card-plain">
                    <div class="card-header">
                      <h4 class="font-weight-bolder">Sign Up</h4>
                      <p class="mb-0">
                        Enter your email and password to register
                      </p>
                    </div>
                    <div class="card-body">
                      <SignUpForm />
                    </div>
                    <div class="card-footer text-center pt-0 px-lg-2 px-1">
                      <p class="mb-2 text-sm mx-auto">
                        Already have an account?
                        <NavLink
                          className="text-primary text-gradient font-weight-bold"
                          to="/login"
                        >
                          Sign In
                        </NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
}

export default SignUp;
