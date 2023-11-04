import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPublicNotice() {
  const [data, setData] = useState({
    noticetitle: "",
    noticemessage: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/getPublicNotice/${id}`)
      .then((res) => {
        const publicnotic = res.data.Result[0];
        setData({
          ...data,
          noticetitle: publicnotic.noticetitle,
          noticemessage: publicnotic.noticemessage,
        });
      })
      .catch((err) => console.log(err));
  }, [id]); // Include 'id' as a dependency to trigger the effect on ID change

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      noticetitle: data.noticetitle,
      noticemessage: data.noticemessage,
    };
    axios
      .put(`http://localhost:8081/updatePublicNotice/${id}`, updatedData)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/managePublicNotice");
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
                Update Public Notice
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
                    onChange={(e) =>
                      setData({ ...data, noticetitle: e.target.value })
                    }
                    value={data.noticetitle}
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
                    onChange={(e) =>
                      setData({ ...data, noticemessage: e.target.value })
                    }
                    value={data.noticemessage}
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

export default EditPublicNotice;
