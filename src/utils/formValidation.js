export function signupValidation(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Required";
  } else if (values.password !== values.passwordConfirm) {
    errors.password = "Password and passwordConfirm must be same";
  }

  return errors;
}

export function loginValidation(values) {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
}

export function taskValidation(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Required";
  }

  return errors;
}
