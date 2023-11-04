import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DateReport = () => {
  const [todate, setToDate] = useState("");
  const [fromdate, setFromDate] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/searchReport", {
        fromdate: fromdate,
        todate: todate,
      });

      setData(response.data);

      if (response.data.length === 0) {
        setData2([{ id: 1 }]); // Add a placeholder object to data2
      } else {
        setData2([]); // Clear data2 if data is found
      }
    } catch (error) {
      console.error("Error searching student:", error);
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
                Search Between Dates Report
              </h4>
            </div>
            <div className="card-body">
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Fromdate:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="exampleInputUsername1"
                    value={fromdate}
                    required
                    onChange={(e) => setFromDate(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Todate:</label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    name="date"
                    id="exampleInputUsername1"
                    value={todate}
                    onChange={(e) => setToDate(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
              </form>
            </div>
          </div><br/>
          {data.length > 0 && (
            <div className="card">
              <h4
                style={{ marginLeft: "25px", marginTop: "10px" }}
                className="card-title text-center"
              >
                Search Report from {fromdate} to {todate}
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
                <h2>
                  No data found for Fromdate {fromdate} Todate {todate}
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateReport;
