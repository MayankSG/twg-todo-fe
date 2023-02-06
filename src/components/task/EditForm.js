import { Formik, ErrorMessage } from "formik";
import { taskValidation } from "../../utils/formValidation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditForm() {
  let { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    getTaskHandler();
  }, []);

  const getTaskHandler = () => {
    const url = "http://127.0.0.1:8000/api/v1/task/" + id;
    const token = localStorage.getItem("token");

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        console.log(response.data.data.data);
        setEditData(response.data.data.data);
        setEdit(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const submitHandler = async (data) => {
    const url = "http://127.0.0.1:8000/api/v1/task/" + id;
    data.status = data.status ? "open" : "closed";
    console.log(data);
    axios
      .put(url, data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        console.log(response);
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Task Updated ",
            message: "Task update successfully",
          })
        );
        // navigate("/");
        getTaskHandler();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {edit && (
        <Formik
          initialValues={{
            title: editData.title,
            description: editData.description,
            status: editData.status,
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
                  value={values.title}
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
              <div class="form-check form-switch ps-0 is-filled">
                <input
                  class="form-check-input ms-auto"
                  type="checkbox"
                  name="status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.status === "open" ? true : false}
                />
                <label
                  class="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                  for="flexSwitchCheckDefault"
                >
                  Status
                </label>
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
      )}
    </>
  );
}

export default EditForm;
