// import classes from "./Notification.module.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const Notification = (props) => {
  const dispatch = useDispatch();

  const [timerStatus, setTimerStatus] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      dispatch(uiActions.showNotification({}));
    }, 3000);
  }, []);

  const renderSwitch = (param) => {
    switch (param) {
      case "success":
        return (
          <div
            class="toast fade show p-2 mt-2 bg-gradient-info"
            role="alert"
            aria-live="assertive"
            id="infoToast"
            aria-atomic="true"
          >
            <div class="toast-header bg-transparent border-0">
              <i class="material-icons text-white me-2">notifications</i>
              <span class="me-auto text-white font-weight-bold">
                {props.title}
              </span>

              <i
                class="fas fa-times text-md text-white ms-3 cursor-pointer"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></i>
            </div>
            <hr class="horizontal light m-0" />
            <div class="toast-body text-white">{props.message}</div>
          </div>
        );
      case "warning":
        return (
          <div
            class="toast fade show p-2 mt-2 bg-white"
            role="alert"
            aria-live="assertive"
            id="dangerToast"
            aria-atomic="true"
          >
            <div class="toast-header border-0">
              <i class="material-icons text-danger me-2">campaign</i>
              <span class="me-auto text-gradient text-danger font-weight-bold">
                {props.title}
              </span>

              <i
                class="fas fa-times text-md ms-3 cursor-pointer"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></i>
            </div>
            <hr class="horizontal dark m-0" />
            <div class="toast-body">{props.message}</div>
          </div>
        );
      case "info":
        return (
          <div
            class="toast fade show p-2 bg-white"
            role="alert"
            aria-live="assertive"
            id="successToast"
            aria-atomic="true"
          >
            <div class="toast-header border-0">
              <i class="material-icons text-success me-2">check</i>
              <span class="me-auto font-weight-bold"> {props.title}</span>

              <i
                class="fas fa-times text-md ms-3 cursor-pointer"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></i>
            </div>
            <hr class="horizontal dark m-0" />
            <div class="toast-body">{props.message} </div>
          </div>
        );
      default:
        return "";
    }
  };

  return (
    <div class="container-fluid py-4">
      <div class="position-fixed end-1 z-index-2">
        {timerStatus && renderSwitch(props.status)}
      </div>
    </div>
  );
};

export default Notification;
