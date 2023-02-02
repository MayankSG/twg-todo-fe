import { useFormik } from "formik";
import { signupValidation } from "../../utils/formValidation";

function SignUpForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cnfPassword: "",
    },
    validate: signupValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div class="input-group input-group-outline mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div class="input-group input-group-outline mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div class="input-group input-group-outline mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div class="input-group input-group-outline mb-3">
          <label class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            name="cnfPassword"
            onChange={formik.handleChange}
            value={formik.values.cnfPassword}
          />
        </div>

        <div class="text-center">
          <button
            class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
            type="button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
