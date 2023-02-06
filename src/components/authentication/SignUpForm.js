import { Formik, ErrorMessage } from "formik";
import { signupValidation } from "../../utils/formValidation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { redirect, useNavigate } from "react-router-dom";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (data) => {
    const url = "http://127.0.0.1:8000/api/v1/users/signup";
    axios
      .post(url, data)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Sign Up ",
            message: "User signed up successfully",
          })
        );
        console.log("redirect");
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div class="input-group input-group-outline mb-3">
              <input
                type="name"
                class="form-control"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Name"
              />
            </div>
            {errors.name && touched.name && errors.name}
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
            <div class="input-group input-group-outline mb-3">
              <input
                class="form-control"
                type="password"
                name="passwordConfirm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirm}
                placeholder="Confirm Password"
              />
            </div>
            {errors.passwordConfirm &&
              touched.passwordConfirm &&
              errors.passwordConfirm}
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

export default SignUpForm;
