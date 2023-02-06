import { Formik, ErrorMessage } from "formik";
import { taskValidation } from "../../utils/formValidation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { redirect, useNavigate } from "react-router-dom";

function CreateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  const submitHandler = async (data) => {
    const url = "http://127.0.0.1:8000/api/v1/task";
    axios
      .post(url, data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        console.log(response);
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Task Create ",
            message: "Task Create successfully",
          })
        );
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
          title: "",
          description: "",
        }}
        validate={taskValidation}
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
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Title"
              />
            </div>
            {errors.title && touched.title && errors.title}
            <div class="input-group input-group-outline mb-3">
              <input
                type="text"
                class="form-control"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="Description"
              />
            </div>
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

export default CreateForm;
