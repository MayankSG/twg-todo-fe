import { Form, NavLink } from "react-router-dom";

function SideNavigation() {
  // const navigation = useNavigation();

  return (
    <>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>

          <NavLink className="navbar-brand m-0" to="/">
            <span className="ms-1 font-weight-bold text-white">Todo List</span>
          </NavLink>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div
          className="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white active bg-gradient-primary"
                    : "nav-link text-white"
                }
                to="/"
                end
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">dashboard</i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </NavLink>
              {/* </a> */}
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white active bg-gradient-primary"
                    : "nav-link text-white"
                }
                to="/users"
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">table_view</i>
                </div>
                <span className="nav-link-text ms-1">Add New</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidenav-footer position-absolute w-100 bottom-0 ">
          <div className="mx-3">
            <Form action="logout" method="post">
              <button className="btn bg-gradient-primary mt-4 w-100">
                Logout
              </button>
            </Form>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideNavigation;
