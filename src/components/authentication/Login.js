import { lazy } from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <body className="bg-gray-200">
      <main className="main-content  mt-0">
        <div className="page-header align-items-start min-vh-100">
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                        Sign in
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}

export default Login;
