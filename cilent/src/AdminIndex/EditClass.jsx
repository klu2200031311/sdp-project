import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditClass() {
  const [data, setData] = useState({
    classname: "",
    section: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/getClass/${id}`)
      .then((res) => {
        const doctor = res.data.Result[0];
        setData({
          ...data,
          classname: doctor.classname,
          section: doctor.section,
        });
      })
      .catch((err) => console.log(err));
  }, [id]); // Include 'id' as a dependency to trigger the effect on ID change

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      classname: data.classname,
      section: data.section,
    };
    axios
      .put(`http://localhost:8081/updateClass/${id}`, updatedData)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/manageclass");
          alert("Update successfully");
        }
      })
      .catch((err) => console.log(err));
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
                <div className="form-group">
                  <label for="exampleInputUsername1">Class Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="classname"
                    onChange={(e) =>
                      setData({ ...data, classname: e.target.value })
                    }
                    value={data.classname}
                    autoComplete="off"
                    required
                    id="exampleInputUsername1"
                    placeholder="Enter Class Name"
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputConfirmPassword2">Section</label>
                  <select
                    type="text"
                    className="form-control"
                    name="section"
                    onChange={(e) =>
                      setData({ ...data, section: e.target.value })
                    }
                    value={data.section}
                    autoComplete="off"
                    id="exampleInputConfirmPassword2"
                    required
                  >
                    <option>Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                  </select>
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

export default EditClass;
