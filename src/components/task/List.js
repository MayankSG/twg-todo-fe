import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { NavLink } from "react-router-dom";
import { taskList, deleteTask } from "../../services/taskServices/task";
function List() {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    submitHandler();
  }, []);

  const submitHandler = () => {
    taskList()
      .then((response) => {
        setTasks(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteHandler = (id) => {
    const confirmBox = window.confirm("Are you sure you want to delete");

    if (confirmBox) {
      deleteTask(id)
        .then(() => {
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Task Delete ",
              message: "Task deleted successfully",
            })
          );
          submitHandler();
        })
        .catch((err) => {
          dispatch(
            uiActions.showNotification({
              status: "warning",
              title: "Something went wrong",
              message: err.message,
            })
          );
        });
    }
  };
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-10 mx-auto">
          <div className="card my-4  z-index-1">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg p-3 d-flex justify-content-between align-items-center">
                <h6 className="text-white text-capitalize mb-0">All Tasks</h6>
                <button className="btn btn-primary mb-0">
                  {" "}
                  <i className="material-icons opacity-10">add_to_photos</i> Add
                  Task
                </button>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Title
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        discription
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Status
                      </th>
                      <th colSpan={2} className="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{task.title}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs text-secondary mb-0">
                              {task.description}
                            </p>
                          </td>

                          <td className="align-middle text-center">
                            {task.status === "open" ? (
                              <span className="badge badge-sm bg-gradient-info">
                                todo
                              </span>
                            ) : (
                              <span className="badge badge-sm bg-gradient-warning">
                                completed
                              </span>
                            )}
                          </td>
                          <td className="align-middle">
                            <NavLink
                              to={`${"/task/" + task._id}`}
                              className="text-secondary font-weight-bold text-xs"
                            >
                              <i className="material-icons opacity-10">mode</i>
                            </NavLink>
                          </td>
                          <td className="align-middle">
                            <a
                              onClick={() => deleteHandler(task._id)}
                              className="text-secondary font-weight-bold text-xs"
                              data-toggle="tooltip"
                              data-original-title="Edit user"
                            >
                              <i className="material-icons opacity-10">
                                delete
                              </i>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
