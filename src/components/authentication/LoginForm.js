import { Form, NavLink, useActionData, useNavigation } from "react-router-dom";

function LoginForm() {
  const errors = useActionData();
  const navigation = useNavigation();

  const text =
    navigation.state === "submitting"
      ? "Saving..."
      : navigation.state === "loading"
      ? "Saved!"
      : "Go";

  return (
    <>
      {errors && (
        <div
          class="alert alert-primary alert-dismissible text-white"
          role="alert"
        >
          {Object.values(errors).length > 0 &&
            Object.values(errors).map((error) => (
              <>
                <span class="text-sm">{error}</span>
                <br />
              </>
            ))}

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

      <Form method="post" action="/login">
        <div class="input-group input-group-outline my-3">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <div class="input-group input-group-outline mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        {/* <div class="form-check form-switch d-flex align-items-center mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="rememberMe"
            checked
          />
          <label class="form-check-label mb-0 ms-3" for="rememberMe">
            Remember me
          </label>
        </div> */}
        <div class="text-center">
          <button class="btn bg-gradient-primary w-100 my-4 mb-2">
            {text}
          </button>
        </div>
        <p class="mt-4 text-sm text-center">
          Don't have an account?
          <NavLink
            className="text-primary text-gradient font-weight-bold"
            to="/signup"
          >
            Sign up
          </NavLink>
        </p>
      </Form>
    </>
  );
}

export default LoginForm;
