import { Formik } from "formik";
import { taskValidation } from "../../utils/formValidation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const BASE_URL = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const [isFormType, setIsFormType] = useState("create");
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (param.id) {
      setIsFormType("update");
      getTaskHandler();
    } else {
      setOpenForm(true);
    }
  }, []);

  const getTaskHandler = () => {
    const url = `${BASE_URL + "api/v1/task/" + param.id}`;
    const token = localStorage.getItem("token");

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        console.log(response.data.data.data);
        setEditData(response.data.data.data);
        setOpenForm(true);
      })
      .catch(function (error) {
        console.log(error.message);
        dispatch(
          uiActions.showNotification({
            status: "warning",
            title: "Something went wrong",
            message: error.message,
          })
        );
      });
  };

  const submitHandler = async (data) => {
    const url = `${BASE_URL + "api/v1/task/"}`;
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
        dispatch(
          uiActions.showNotification({
            status: "warning",
            title: "Something went wrong",
            message: "Something went wrong",
          })
        );
      });
  };

  const updateHandler = async (data) => {
    const url = `${BASE_URL + "api/v1/task/" + param.id}`;
    data.status = data.status[0];
    axios
      .put(url, data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Task Updated ",
            message: "Task update successfully",
          })
        );
        navigate("/");
        getTaskHandler();
      })
      .catch(function (error) {
        dispatch(
          uiActions.showNotification({
            status: "warning",
            title: "Something went wrong",
            message: "Something went wrong",
          })
        );
      });
  };

  return (
    <>
      {openForm && (
        <Formik
          initialValues={{
            title: isFormType === "create" ? "" : editData.title,
            description: isFormType === "create" ? "" : editData.description,
            status: isFormType === "create" ? "open" : editData.status,
          }}
          validate={taskValidation}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              isFormType === "create"
                ? submitHandler(values)
                : updateHandler(values);
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
              <div className="input-group input-group-outline mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder="Title"
                />
              </div>
              {errors.title && touched.title && errors.title}
              <div className="input-group input-group-outline mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Description"
                />
              </div>
              {isFormType === "update" && (
                <div className="form-check  ps-0 is-filled">
                  <input
                    className="form-check-input ms-auto"
                    type="checkbox"
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status === "open" ? "closed" : "open"}
                    checked={values.status === "open" ? false : true}
                  />
                  <label
                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                    for="flexSwitchCheckDefault"
                  >
                    Completed
                  </label>
                </div>
              )}
              <button
                className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                type="submit"
                disabled={isSubmitting}
              >
                {isFormType === "create" ? "Save" : "Update"}
              </button>
            </form>
          )}
        </Formik>
      )}
    </>
  );
}

export default TaskForm;
