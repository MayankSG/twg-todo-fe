import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { NavLink } from "react-router-dom";

function List() {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    submitHandler();
  }, []);

  const submitHandler = async () => {
    const url = "http://127.0.0.1:8000/api/v1/task";
    const token = localStorage.getItem("token");

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        console.log(response);
        setTasks(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteHandler = (id) => {
    const confirmBox = window.confirm("Are you sure you want to delete");

    if (confirmBox) {
      const url = "http://127.0.0.1:8000/api/v1/task/" + id;
      const token = localStorage.getItem("token");

      axios
        .delete(url, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(function (response) {
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Task Delete ",
              message: "Task deleted successfully",
            })
          );
          submitHandler();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-10 mx-auto">
          <div class="card my-4  z-index-1">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg p-3 d-flex justify-content-between align-items-center">
                <h6 class="text-white text-capitalize mb-0">All Tasks</h6>
                <button className="btn btn-primary mb-0">
                  {" "}
                  <i className="material-icons opacity-10">add_to_photos</i> Add
                  Task
                </button>
              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Title
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        discription
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Status
                      </th>
                      <th colSpan={2} class="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => {
                      return (
                        <tr>
                          <td>
                            <div class="d-flex px-2 py-1">
                              <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">{task.title}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs text-secondary mb-0">
                              {task.description}
                            </p>
                          </td>

                          <td class="align-middle text-center">
                            {task.status === "open" ? (
                              <span class="badge badge-sm bg-gradient-info">
                                todo
                              </span>
                            ) : (
                              <span class="badge badge-sm bg-gradient-warning">
                                completed
                              </span>
                            )}
                          </td>
                          <td class="align-middle">
                            <NavLink
                              to={`${"/task/" + task._id}`}
                              class="text-secondary font-weight-bold text-xs"
                            >
                              <i className="material-icons opacity-10">mode</i>
                            </NavLink>
                          </td>
                          <td class="align-middle">
                            <a
                              href="javascript:;"
                              onClick={() => deleteHandler(task._id)}
                              class="text-secondary font-weight-bold text-xs"
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
