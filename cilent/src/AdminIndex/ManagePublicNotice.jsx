import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function ManagePublicNotice() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/managePublicNotice")
      .then((res) => {
        if (res.data.Status === "Success") {
          const publicnotic = res.data.Result;
          const initialShowPasswordState = publicnotic.reduce(
            (state, publicnotic) => {
              return {
                ...state,
                [publicnotic.id]: false,
              };
            },
            {}
          );
          setData(publicnotic);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Public Notic ?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deletePublicNotice/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(data.filter((publicnotic) => publicnotic.id !== id));
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Tables</h1>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Manage Public Notice</h4>
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
                    <th>Notice Title</th>
                    <th>Notice Message</th>
                    <th>Entry Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>S.No.</th>
                    <th>Notice Title</th>
                    <th>Notice Message</th>
                    <th>Entry Date</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {data.map((publicnotic, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{publicnotic.noticetitle}</td>
                        <td>{publicnotic.noticemessage.slice(0, 50)} ....</td>
                        <td>{publicnotic.entrydate.slice(0, 16)}</td>
                        <td>
                          <Link
                            to={`/editPublicNotice/${publicnotic.id}`}
                            className="btn btn-primary"
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          &nbsp;
                          <button
                            onClick={() => handleDelete(publicnotic.id)}
                            className="btn btn-danger"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagePublicNotice;
