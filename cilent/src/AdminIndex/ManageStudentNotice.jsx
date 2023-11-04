import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManageStudentNotice() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentNoticeData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/manageStudentNotice');
        if (response.data.Status === 'Success') {
          setData(response.data.Result);
          setError(null); // Clear any previous error
        } else {
          setError('Error fetching studentnotice data');
        }
      } catch (error) {
        console.error('An error occurred while fetching studentnotice data:', error);
        setError('Error fetching studentnotice data');
      }
    };

    fetchStudentNoticeData();
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Notice?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteStudentNotice/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(data.filter((classname) => classname.id !== id));
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Tables</h1>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Manage Notice</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Title Name</th>
                    <th>Class Name</th>
                    <th>Entry Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>S.No.</th>
                    <th>Class Name</th>
                    <th>Section</th>
                    <th>Entry Date</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {data.map((studentnotic, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{studentnotic.title}</td>
                        <td>{studentnotic.classname}</td>
                        <td>{studentnotic.entrydate.slice(0, 16)}</td>
                        <td>
                          <Link
                            to={`/editStudentNotice/${studentnotic.id}`}
                            className="btn btn-primary"
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          &nbsp;
                          <button
                            onClick={() => handleDelete(studentnotic.id)}
                            className="btn btn-danger"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
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
  );
}

export default ManageStudentNotice;
