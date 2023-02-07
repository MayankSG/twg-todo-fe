import { Outlet, useSubmit } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SideNavigation from "../components/layouts/SideNavigation";
import Notification from "../components/UI/Notification";

function RootLayout() {
  const token = localStorage.getItem("token");
  const submit = useSubmit();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (!token) return;

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, 1 * 60 * 60 * 1000);
  });

  return (
    <div className="g-sidenav-show bg-gray-200 g-sidenav-pinned">
      <SideNavigation />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
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
