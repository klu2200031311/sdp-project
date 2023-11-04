import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StudentDetail() {
  const [showPassword, setShowPassword] = useState({});
  const [showPassword1, setShowPassword1] = useState({});
  const [data, setData] = useState({
    studentname: "",
    email: "",
    classname: "",
    gender: "",
    birth: "",
    studentid: "",
    image: "",
    father: "",
    mother: "",
    contact: "",
    altcontact: "",
    address: "",
    entrydate: "", // Added entrydate field
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/studentDetail/${id}`)
      .then((res) => {
        const student = res.data.Result[0];
        setData(student);
      })
      .catch((err) => {
        console.error("Error retrieving student details:", err);
      });
  }, [id]);

  return (
    <div>
      <div className="card" style={{ borderColor: "red" }}>
        <div className="card-body">
          <div className="text-center">
            <h5 className="card-title" style={{ color: "red" }}>
              View Student Detail
            </h5>
          </div>
          <hr style={{ backgroundColor: "green", height: "2px" }} />
          <table className="table table-bordered border-primary">
            <tbody>
              <tr>
                <th scope="row">Student Name</th>
                <td>{data.studentname}</td>
                <th scope="row">Student Id</th>
                <td>{data.studentid}</td>
              </tr>
              <tr>
                <th scope="row">Student Photo</th>
                <td>
                  <img
                    src={`http://localhost:8081/images/${data.image}`}
                    style={{ width: "70px" }}
                  />
                </td>

                <th>Student Class/Section</th>
                <td>
                  {data.classname} / [{data.section}]
                </td>
              </tr>
              <tr>
                <th scope="row">Date of Birth</th>
                <td>{data.birth}</td>

                <th>Gender</th>
                <td>{data.gender}</td>
              </tr>
              <tr>
                <th scope="row">Father Name</th>
                <td>{data.father}</td>

                <th>Mother Name</th>
                <td>{data.mother}</td>
              </tr>
              <tr>
                <th scope="row">Contact No.</th>
                <td>{data.contact}</td>

                <th>Alternate Number</th>
                <td>{data.altcontact}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{data.address}</td>

                <th>Date of Admission</th>
                <td>{data.entrydate.slice(0, 16)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;
