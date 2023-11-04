import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [studentname, setStudentName] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8081/searchStudent?studentname=${studentname}`
      );
      setData(response.data.Result);

      // Check if data is empty and display appropriate message
      if (response.data.Result.length === 0) {
        setData2([{ id: 1 }]); // Add a placeholder object to data2
      } else {
        setData2([]); // Clear data2 if data is found
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
    <div className="col-md-12 grid-margin stretch-card">
      <div className="card">
        <div className="card">
          <div style={{ backgroundColor: "#57c7d4", height: "40px" }}>
            <h4
              style={{ marginLeft: "25px", marginTop: "10px", color: "black", }}
              className="card-title"
            >
              Search Student
            </h4>
          </div>
          <div className="card-body">
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">
                  Search by Student Id/Student Name/Student Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="exampleInputUsername1"
                  value={studentname}
                  required
                  onChange={(e) => setStudentName(e.target.value)}
                  autoComplete="off"
                  placeholder="Enter Student Id/Student Name/Student Email"
                />
              </div>

              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
            </form>
          </div>
        </div>
        {data.length > 0 && (
          <div className="card">
            <h4
              style={{ marginLeft: "25px", marginTop: "10px" }}
              className="card-title text-center"
            >
              Result against "{studentname}" Keyword
            </h4>
            <div className="table-responsive">
              <table className="table table-striped">
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
                    <td>{student.classname}</td>
                    <td>{student.studentname}</td>
                    <td>{student.email}</td>
                    <td>{student.entrydate.slice(0, 16)}</td>
                    <td>
                      <Link
                        to={`/studentDetail/${student.id}`}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {data2.length > 0 && (
          <div className="container-fluid">
            <div className="text-center">
              <h2>No data found for Booking {studentname}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Search;
