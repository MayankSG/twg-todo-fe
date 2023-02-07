import { Formik } from "formik";
import { taskValidation } from "../../utils/formValidation";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  singleTask,
  updateTask,
  createTask,
} from "../../services/taskServices/task";

function TaskForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const [isFormType, setIsFormType] = useState("create");
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [status, setStatus] = useState("open");

  useEffect(() => {
    if (param.id) {
      setIsFormType("update");
      getTaskHandler();
    } else {
      setOpenForm(true);
    }
  }, [param, getTaskHandler]);

  const getTaskHandler = () => {
    singleTask(param.id)
      .then(function (response) {
        setEditData(response.data.data.data);
        setStatus(response.data.data.data.status);
        setOpenForm(true);
      })
      .catch(function (error) {
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
    createTask(data)
      .then(function (response) {
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
    data.status = status;
    updateTask(data, param.id)
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
                    onChange={() =>
                      setStatus(status === "open" ? "closed" : "open")
                    }
                    // onBlur={handleBlur}
                    value={status}
                    checked={status === "open" ? false : true}
                  />
                  <label
                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                    htmlFor="flexSwitchCheckDefault"
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
