import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, Suspense, lazy } from "react";

const SideNavigation = lazy(() =>
  import("../components/layouts/SideNavigation")
);
const Notification = lazy(() => import("../components/UI/Notification"));

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (!token) return;

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, 1 * 60 * 60 * 1000);
  });

  return (
    <>
      <body className="g-sidenav-show bg-gray-200 g-sidenav-pinned">
        <SideNavigation />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          {notification && (
            <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />
          )}

          <Suspense>
            <Outlet />
          </Suspense>
        </main>
      </body>
    </>
  );
}

export default RootLayout;
