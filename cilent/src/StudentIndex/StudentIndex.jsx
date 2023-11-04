import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";

function StudentIndex() {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081/dashboard")
      .then((res) => {
        if (res.data.Status === "Success") {
          if (res.data.role === "student") {
            navigate("/student");
          } else {
            navigate("/");
          }
        } else {
          navigate("/index");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/index");
      });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        navigate("/index");
      })
      .catch((err) => console.log(err));
  };
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <div id="page-top">
      <div id="wrapper">
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="/student"
          >
            <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-desktop"></i>

            </div>
            <div className="sidebar-brand-text mx-3">
              Student
            </div>
          </a>
          <hr className="sidebar-divider my-0" />

          <li className="nav-item active">
            <a className="nav-link" href="/student">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading">Interface</div>
         
          <li className="nav-item">
            <Link className="nav-link" to="profile">
            <i style={{color:"yellow"}} className="fas fa-fw fa-folder"></i>
              <span>Profile</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="studentNotice">
              <i style={{color:"yellow"}} className="fas fa-eye"></i>
              <span>View Notice</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="change_Password">
              <i style={{color:"yellow"}} className="fas fa-cog"></i>
              <span>Change Password</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="" onClick={handleLogout}>
            <i style={{color:"yellow"}} className="fas fa-sign-out-alt"></i>
              <span>Log-Out</span>
            </Link>
          </li>
          <hr className="sidebar-divider" />
        </ul>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars"></i>
              </button>

              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="searchDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-search fa-fw"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form className="form-inline mr-auto w-100 navbar-search">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control bg-light border-0 small"
                          placeholder="Search for..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>
              </ul>
            </nav>
            <Outlet/>
          </div>
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Your Website {year}</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default StudentIndex;
