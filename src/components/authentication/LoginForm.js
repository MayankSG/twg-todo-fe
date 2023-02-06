import { Formik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../utils/formValidation";
import { useState } from "react";
function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({ status: false, message: "" });
  const submitHandler = async (data) => {
    const url = "http://127.0.0.1:8000/api/v1/users/login";
    axios
      .post(url, data)
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.data.user.email);

        navigate("/");
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setError({ status: true, message: error.response.data.message });
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validate={loginValidation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            submitHandler(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div class="input-group input-group-outline mb-3">
              <input
                type="email"
                class="form-control"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
              />
            </div>
            {errors.email && touched.email && errors.email}
            <div class="input-group input-group-outline mb-3">
              <input
                class="form-control"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
              />
            </div>
            {errors.password && touched.password && errors.password}

            {error.status && (
              <div
                class="alert alert-primary alert-dismissible text-white"
                role="alert"
              >
                <span class="text-sm">{error.message}</span>
                <button
                  type="button"
                  class="btn-close text-lg py-3 opacity-10"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
            <button
              class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
