import { Formik } from "formik";
import { signupValidation } from "../../utils/formValidation";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/authServices/auth";
import { useState } from "react";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    message: "Something went wrong...!!",
  });

  const submitHandler = async (data) => {
    signUp(data)
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.data.user.email);
        localStorage.setItem("name", response.data.data.user.name);
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Sign Up ",
            message: "User signed up successfully",
          })
        );
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
        validate={signupValidation}
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
                type="name"
                className="form-control my-2"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Name"
              />
            </div>
            <small className="text-danger mb-0">
              {errors.name && touched.name && errors.name}
            </small>

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
                className="form-control my-3"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
              />
            </div>

            <small className="text-danger mb-0">
              {errors.password && touched.password && errors.password}
            </small>
            <div className="input-group input-group-outline ">
              <input
                className="form-control my-2"
                type="password"
                name="passwordConfirm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirm}
                placeholder="Confirm Password"
              />
            </div>
            <small className="text-danger mb-0">
              {errors.passwordConfirm &&
                touched.passwordConfirm &&
                errors.passwordConfirm}
            </small>

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

export default SignUpForm;
