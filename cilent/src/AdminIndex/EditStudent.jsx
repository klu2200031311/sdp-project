import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent() {
  const { id } = useParams(); // Fetch the student ID from URL parameter
  const [data, setData] = useState({
    // Initialize with empty values
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
  });

  const [myClass, setMyClass] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getClasses");
        if (Array.isArray(response.data)) {
          setMyClass(response.data);
        } else {
          setError("Failed to fetch Class. Invalid response.");
        }
      } catch (error) {
        setError("Failed to fetch Class.");
        console.log(error);
      }
    };

    fetchClass();
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/getStudent/${id}`
        );
        if (response.data.Status === "Success") {
          setData(response.data.Result[0]); // Update student data with fetched data
        } else {
          setError("Error fetching student data");
        }
      } catch (error) {
        console.error("An error occurred while fetching student data:", error);
        setError("Error fetching student data");
      }
    };

    fetchStudentData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new FormData object
    const formData = new FormData();
    // Append the updated data fields
    formData.append("studentname", data.studentname);
    formData.append("email", data.email);
    formData.append("classname", data.classname);
    formData.append("gender", data.gender);
    formData.append("birth", data.birth);
    formData.append("studentid", data.studentid);
    formData.append("image", data.image);
    formData.append("father", data.father);
    formData.append("mother", data.mother);
    formData.append("contact", data.contact);
    formData.append("altcontact", data.altcontact);
    formData.append("address", data.address);

    axios
      .put("http://localhost:8081/updateStudent/" + id, formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/manageStudent");
          alert("Update successfully");
        }
      })
      .catch((err) => console.log(err));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div>
      <div className="col-md-11 grid-margin stretch-card">
        <div className="card">
          <div className="card">
            <div style={{ backgroundColor: "#57c7d4", height: "40px" }}>
              <h4
                style={{
                  marginLeft: "25px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "black",
                }}
                className="card-title"
              >
                Update Class
              </h4>
            </div>
            <div className="card-body">
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Student Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="studentname"
                      value={data.studentname}
                      onChange={(e) =>
                        setData({ ...data, studentname: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Student Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Student Email</label>
                    <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputUsername1"
                      name="email"
                      autoComplete="off"
                      required
                      placeholder="Enter Student Email"
                      value={showPassword ? data.email : "********"}
                      onChange={(e) => {
                          if (showPassword) {
                          setData(prevData => ({ ...prevData, email: e.target.value }));
                          }
                      }}
                      />
                      <span style={{ color: 'blue', marginLeft:"", marginTop:"" }}
                        className={`input-group-text toggle-password-2 ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                        onClick={togglePasswordVisibility}
                      ></span>
                      </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="text-left">Student Class</div>
                  <select
                    type="text"
                    name="classname"
                    className="form-control"
                    id="inputDoctor"
                    value={data.classname}
                    onChange={(e) =>
                      setData({ ...data, classname: e.target.value })
                    }
                  >
                    <option value="">Select Class</option>
                    {myClass.map((classInfo) => (
                      <option key={classInfo.id} value={classInfo.classname}>
                        {classInfo.classname} [ {classInfo.section} ]
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="gender" className="form-label">
                      Gender:
                    </label>
                    <select
                      className="form-control"
                      id="gender"
                      name="gender"
                      value={data.gender}
                      onChange={(e) =>
                        setData({ ...data, gender: e.target.value })
                      }
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="birth"
                      value={data.birth}
                      onChange={(e) =>
                        setData({ ...data, birth: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Student Id</label>
                    <input
                      type="text"
                      className="form-control"
                      name="studentid"
                      readOnly
                      value={data.studentid}
                      onChange={(e) =>
                        setData({ ...data, studentid: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Student Id"
                    />
                  </div>
                  <div className="col-md-4">
                    <label for="exampleInputUsername1">Student Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={(e) =>
                        setData({ ...data, image: e.target.files[0] })
                      }
                      autoComplete="off"
                      id="exampleInputUsername1"
                    />
                  </div>
                  <div className="col-md-2">
                    <img
                      src={`http://localhost:8081/images/` + data.image}
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>

                <h3>Parents/Guardian's Details</h3>
                <hr className="border" />

                <div className="row">
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Father Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="father"
                      value={data.father}
                      onChange={(e) =>
                        setData({ ...data, father: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Father Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Mother Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mother"
                      value={data.mother}
                      onChange={(e) =>
                        setData({ ...data, mother: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Mother Name"
                    />
                  </div>
                </div>

                <div className="row">
                <div className="col-md-6">
                    <label for="exampleInputUsername1">Contact Number</label>
                    <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputUsername1"
                      name="email"
                      autoComplete="off"
                      required
                      placeholder="Enter Contact Number"
                      value={showPassword1 ? data.contact : "********"}
                      onChange={(e) => {
                          if (showPassword1) {
                          setData(prevData => ({ ...prevData, contact: e.target.value }));
                          }
                      }}
                      />
                      <span style={{ color: 'blue', marginLeft:"", marginTop:"" }}
                        className={`input-group-text toggle-password-2 ${showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"}`}
                        onClick={togglePasswordVisibility1}
                      ></span>
                      </div>
                  </div>
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Alternate Contact Number</label>
                    <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputUsername1"
                      name="email"
                      autoComplete="off"
                      required
                      placeholder="Enter Alternate Contact Number"
                      value={showPassword2 ? data.altcontact : "********"}
                      onChange={(e) => {
                          if (showPassword2) {
                          setData(prevData => ({ ...prevData, altcontact: e.target.value }));
                          }
                      }}
                      />
                      <span style={{ color: 'blue', marginLeft:"", marginTop:"" }}
                        className={`input-group-text toggle-password-2 ${showPassword2 ? "fa fa-eye-slash" : "fa fa-eye"}`}
                        onClick={togglePasswordVisibility2}
                      ></span>
                      </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="exampleInputUsername1">Address</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="address"
                    value={data.address}
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                    autoComplete="off"
                    required
                    id="exampleInputUsername1"
                    rows={5}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
