import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddStudent() {
  const [data, setData] = useState({
    studentname: "",
    email: "",
    classname: "",
    gender: "",
    birth: "",
    studentid: "",
    image: "",
    password: "",
    confirmpassword: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data.password !== data.confirmpassword) {
      alert("Password or Confirm Password don't match");
      return;
    }

    const formdata = new FormData();
    formdata.append("studentname", data.studentname);
    formdata.append("email", data.email);
    formdata.append("classname", data.classname);
    formdata.append("gender", data.gender);
    formdata.append("birth", data.birth);
    formdata.append("studentid", data.studentid);
    formdata.append("image", data.image);
    formdata.append("father", data.father);
    formdata.append("mother", data.mother);
    formdata.append("contact", data.contact);
    formdata.append("altcontact", data.altcontact);
    formdata.append("address", data.address);
    formdata.append("password", data.password);

    try {
      const response = await axios.post(
        "http://localhost:8081/AddStudent",
        formdata
      );

      if (response.data.Status === "Success") {
        navigate("/manageStudent");
        alert("Student added successfully");
      } else {
        setError(response.data.Error);
        alert("Student already exists");
      }
    } catch (err) {
      console.log(err);
    }
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
                Add Class
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
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Student Email"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="text-left">Student Class</div>
                  <select
                    name="classname"
                    className="form-control"
                    id="inputDoctor"
                    onChange={(e) =>
                      setData({ ...data, classname: e.target.value })
                    }
                  >
                    <option value="">Select Class</option>
                    {myClass.map((classname) => (
                      <option key={classname.name} value={classname.id}>
                        {classname.classname} [ {classname.section} ]
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
                      onChange={(e) =>
                        setData({ ...data, studentid: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Student Id"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Student Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={(e) =>
                        setData({ ...data, image: e.target.files[0] })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Password</label>
                    <input
                      type="text"
                      className="form-control"
                      name="password"
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">Confirm Password</label>
                    <input
                      type="text"
                      className="form-control"
                      name="confirmpassword"
                      onChange={(e) =>
                        setData({ ...data, confirmpassword: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Confirm Password"
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
                    <input
                      type="text"
                      className="form-control"
                      name="contact"
                      onChange={(e) =>
                        setData({ ...data, contact: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Contact Number"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="exampleInputUsername1">
                      Alternate Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="altcontact"
                      onChange={(e) =>
                        setData({ ...data, altcontact: e.target.value })
                      }
                      autoComplete="off"
                      required
                      id="exampleInputUsername1"
                      placeholder="Enter Other Contact Number"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="exampleInputUsername1">Address</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="address"
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

export default AddStudent;
