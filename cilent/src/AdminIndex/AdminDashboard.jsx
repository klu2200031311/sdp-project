import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [classCount, setClassCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [studentNoticeCount, setStudentNoticeCount] = useState(0);
  const [publicNoticeCount, setPublicNoticeCount] = useState(0);

  useEffect(() => {

    axios
      .get("http://localhost:8081/classCount")
      .then((res) => {
        setClassCount(res.data[0].class);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/studentCount")
      .then((res) => {
        setStudentCount(res.data[0].student);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8081/studentNoticeCount")
      .then((res) => {
        setStudentNoticeCount(res.data[0].studentnotice);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/publicNoticeCount")
      .then((res) => {
        setPublicNoticeCount(res.data[0].publicnotice);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <div>
        <div className="container-fluid">
              <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                  <Link to="/manageclass">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Totle Class
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {classCount}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i style={{color:"blue"}} className="fas fa-calendar fa-2x"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                <Link to="/manageStudent">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Totle Student
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {studentCount}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i style={{color:"green"}} className="fas fa-user fa-2x"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                <Link to="/manageStudentNotice">
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Totle Class Notice
                          </div>
                          <div className="row no-gutters align-items-center">
                            <div className="col-auto">
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                {studentNoticeCount}
                              </div>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm mr-2">
                                <div
                                  className="progress-bar bg-info"
                                  role="progressbar"
                                  style={{ width: "50%" }}
                                  aria-valuenow="50"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i style={{color:"#36b9cc"}} className="fas fa-clipboard-list fa-2x"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <Link to="/managePublicNotice">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Totle Public Notice
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {publicNoticeCount}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i style={{color:"#f6c23e"}} className="fas fa-comments fa-2x"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
    </div>
  )
}

export default AdminDashboard