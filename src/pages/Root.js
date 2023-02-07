import { Outlet, useSubmit } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SideNavigation from "../components/layouts/SideNavigation";
import Notification from "../components/UI/Notification";
import Header from "../components/layouts/Header";
import { uiActions } from "../store/ui-slice";

function RootLayout() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const submit = useSubmit();
  const notification = useSelector((state) => state.ui.notification);
  const sideNavigation = useSelector((state) => state.ui.sideNave);
  let bodyClass = "g-sidenav-show  bg-gray-100 ";

  useEffect(() => {
    if (!token) return;

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, 1 * 60 * 60 * 1000);
  });

  if (sideNavigation) {
    bodyClass = "g-sidenav-show bg-gray-100 g-sidenav-pinned";
  }

  const sideNavigationHandler = () => {
    if (sideNavigation) {
      dispatch(uiActions.changeSideNav());
    }
  };

  return (
    <div className={bodyClass} style={{ height: "100vh" }}>
      <Header />
      <SideNavigation />
      <main
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
        onClick={() => sideNavigationHandler()}
      >
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}

        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
