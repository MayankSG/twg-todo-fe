import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../utils/formValidation";
import { useState } from "react";
import { login } from "../../services/authServices/auth";
function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState({ status: false, message: "" });
  const submitHandler = async (data) => {
    login(data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.data.user.email);
        localStorage.setItem("name", response.data.data.user.name);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());
        navigate("/");
      })
      .catch(function (error) {
        setError({ status: true, message: error?.response?.data?.message });
        setTimeout(() => setError({ status: false }), 3000);
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
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="input-group input-group-outline ">
              <input
                type="email"
                className="form-control my-2"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
              />
            </div>
            <small className="text-danger mb-0">
              {errors.email && touched.email && errors.email}
            </small>
            <div className="input-group input-group-outline ">
              <input
                className="form-control my-2"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
              />
            </div>
            <small className="text-danger">
              {errors.password && touched.password && errors.password}
            </small>

            {error.status && (
              <div
                className="alert alert-primary alert-dismissible text-white"
                role="alert"
              >
                <span className="text-sm">{error.message}</span>
                <button
                  type="button"
                  className="btn-close text-lg py-3 opacity-10"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
            <button
              className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
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
