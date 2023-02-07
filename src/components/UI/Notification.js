import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const Notification = (props) => {
  const dispatch = useDispatch();

  const renderSwitch = (param) => {
    setTimeout(() => {
      dispatch(uiActions.showNotification({}));
    }, 3000);
    switch (param) {
      case "success":
        return (
          <div
            className="toast fade show p-2 mt-2 bg-gradient-info"
            role="alert"
            aria-live="assertive"
            id="infoToast"
            aria-atomic="true"
          >
            <div className="toast-header bg-transparent border-0">
              <i className="material-icons text-white me-2">notifications</i>
              <span className="me-auto text-white font-weight-bold">
                {props.title}
              </span>

              <i
                className="fas fa-times text-md text-white ms-3 cursor-pointer"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></i>
            </div>
            <hr className="horizontal light m-0" />
            <div className="toast-body text-white">{props.message}</div>
          </div>
        );
      case "warning":
        return (
          <div
            className="toast fade show p-2 mt-2 bg-white"
            role="alert"
            aria-live="assertive"
            id="dangerToast"
            aria-atomic="true"
          >
            <div className="toast-header border-0">
              <i className="material-icons text-danger me-2">campaign</i>
              <span className="me-auto text-gradient text-danger font-weight-bold">
                {props.title}
              </span>

              <i
                className="fas fa-times text-md ms-3 cursor-pointer"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></i>
            </div>
            <hr className="horizontal dark m-0" />
            <div className="toast-body">{props.message}</div>
          </div>
        );
      case "info":
        return (
          <div
            className="toast fade show p-2 bg-white"
            role="alert"
            aria-live="assertive"
            id="successToast"
            aria-atomic="true"
          >
            <div className="toast-header border-0">
              <i className="material-icons text-success me-2">check</i>
              <span className="me-auto font-weight-bold"> {props.title}</span>

              <i
                className="fas fa-times text-md ms-3 cursor-pointer"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></i>
            </div>
            <hr className="horizontal dark m-0" />
            <div className="toast-body">{props.message} </div>
          </div>
        );
      default:
        return "";
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="position-fixed end-1 z-index-2">
        {renderSwitch(props.status)}
      </div>
    </div>
  );
};

export default Notification;
