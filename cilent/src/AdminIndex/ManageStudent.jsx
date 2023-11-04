import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManageStudent() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/manageStudent');
        if (response.data.Status === 'Success') {
          setData(response.data.Result);
          setError(null); // Clear any previous error
        } else {
          setError('Error fetching student data');
        }
      } catch (error) {
        console.error('An error occurred while fetching student data:', error);
        setError('Error fetching student data');
      }
    };

    fetchStudentData();
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteStudent/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(data.filter((student) => student.id !== id));
          } else {
            setError('Error deleting student');
          }
        })
        .catch((err) => {
          console.error('An error occurred while deleting student:', err);
          setError('Error deleting student');
        });
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Tables</h1>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Manage Student</h4>
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
                    <th>Student ID</th>
                    <th>Student Class</th>
                    <th>Student Name</th>
                    <th>Student Email</th>
                    <th>Admission Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>S.No.</th>
                    <th>Student ID</th>
                    <th>Student Class</th>
                    <th>Student Name</th>
                    <th>Student Email</th>
                    <th>Admission Date</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                {data.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student.studentid}</td>
                    <td>{student.classname}</td> {/* Update this line */}
                    <td>{student.studentname}</td>
                    <td>{student.email}</td>
                    <td>{student.entrydate.slice(0, 16)}</td>
                    <td>
                      <Link
                        to={`/editStudent/${student.id}`}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                      &nbsp;
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="btn btn-danger"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageStudent;
