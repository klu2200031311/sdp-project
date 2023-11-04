import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditStudentNotice() {
  const [data, setData] = useState({
    title: '',
    classname: '',
    message: '',
  });

  const [myClass, setMyClass] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { id } = useParams();

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
        setError("Failed to fetch Class. Please check your network connection.");
        console.log(error);
      }
    };

    fetchClass();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/getStudentNotice/${id}`)
      .then((res) => {
        const studentnotice = res.data.Result[0];
        setData({
          title: studentnotice.title,
          classname: studentnotice.classname,
          message: studentnotice.message,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      title: data.title,
      classname: data.classname,
      message: data.message,
    };
    axios
      .put(`http://localhost:8081/updateStudentNotice/${id}`, updatedData)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/manageStudentNotice");
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
                Update Notice
              </h4>
            </div>
            <div className="card-body">
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Notice Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                    value={data.title}
                    autoComplete="off"
                    required
                    id="exampleInputUsername1"
                    placeholder="Enter Notice Title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputDoctor">Student Class</label>
                  <select
                    name="classname"
                    className="form-control"
                    id="inputDoctor"
                    onChange={(e) =>
                      setData({ ...data, classname: e.target.value })
                    }
                    value={data.classname}
                  >
                    <option value="">Select Class</option>
                    {myClass.map((classname) => (
                      <option key={classname.id} value={classname.id}>
                        {classname.classname} [ {classname.section} ]
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Notice Message</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    name="message"
                    onChange={(e) =>
                      setData({ ...data, message: e.target.value })
                    }
                    value={data.message}
                    autoComplete="off"
                    required
                    id="exampleInputUsername1"
                    placeholder="Enter Message"
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

export default EditStudentNotice;
