import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddPublicNotice() {
  const [data, setData] = useState({
    noticetitle: "",
    noticemessage: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8081/addPublicNotice", data);
      alert("Public Notice added successfully");
      navigate("/managePublicNotice");
    } catch (error) {
      console.log(error);
    }
    navigate("/managePublicNotice");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                Add Public Notice
              </h4>
            </div>
            <div className="card-body">
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="exampleInputUsername1">Notice Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="noticetitle"
                    onChange={handleInputChange}
                    autoComplete="off"
                    required
                    id="exampleInputUsername1"
                    placeholder="Enter Notice Title"
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputUsername1">Notice Message</label>
                  <textarea
                    rows={4}
                    type="text"
                    className="form-control"
                    name="noticemessage"
                    onChange={handleInputChange}
                    autoComplete="off"
                    required
                    id="exampleInputUsername1"
                    placeholder="Enter Notice Message"
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

export default AddPublicNotice;
