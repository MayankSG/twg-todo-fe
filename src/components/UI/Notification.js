// import classes from "./Notification.module.css";

import { useEffect, useState } from "react";

const Notification = (props) => {
  const [timerStatus, setTimerStatus] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      console.log("end");
      setTimerStatus(false);
    }, 3000);
  });

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
                Material Dashboard{" "}
              </span>
              <small class="text-white">11 mins ago</small>
              <i
                class="fas fa-times text-md text-white ms-3 cursor-pointer"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></i>
            </div>
            <hr class="horizontal light m-0" />
            <div class="toast-body text-white">
              Hello, world! This is a notification message.
            </div>
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
                Material Dashboard{" "}
              </span>
              <small class="text-body">11 mins ago</small>
              <i
                class="fas fa-times text-md ms-3 cursor-pointer"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></i>
            </div>
            <hr class="horizontal dark m-0" />
            <div class="toast-body">
              Hello, world! This is a notification message.
            </div>
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
              <span class="me-auto font-weight-bold">Material Dashboard </span>
              <small class="text-body">11 mins ago</small>
              <i
                class="fas fa-times text-md ms-3 cursor-pointer"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></i>
            </div>
            <hr class="horizontal dark m-0" />
            <div class="toast-body">
              Hello, world! This is a notification message.
            </div>
          </div>
        );
      default:
        return "";
    }
  };

  // if (props.status === "error") {
  //   specialClasses = classes.error;
  // }

  // if (props.status === "info") {
  //   specialClasses = "toast fade p-2 mt-2 bg-gradient-info";
  // }

  // if (props.status === "success") {
  //   specialClasses = "toast fade p-2 bg-white mt-2";
  // }

  // if (props.status === "pending") {
  //   specialClasses = classes.pending;
  // }

  // const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <div class="container-fluid py-4">
      <div class="position-fixed end-1 z-index-2">
        {timerStatus && renderSwitch(props.status)}
      </div>
    </div>
  );
};

export default Notification;
