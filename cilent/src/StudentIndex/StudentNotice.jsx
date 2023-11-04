import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentNotice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch student notices from the server
    axios.get('http://localhost:8081/studentNotice')
      .then(response => {
        setNotices(response.data.Result);
      })
      .catch(error => {
        console.error('Error fetching student notices:', error);
      });
  }, []);

  return (
    <div>
      <div className="card" style={{ borderColor: "red" }}>
        <div className="card-body">
          <div className="text-center">
            <h5 className="card-title" style={{ color: "red" }}>
               Notice Board
            </h5>
          </div>
          <hr style={{ backgroundColor: "green", height: "2px" }} />
          <table className="table table-bordered border-primary">
          {notices.map(notice => (
            <tbody>
              <tr>
                <th scope="row">Notice Announced Date</th>
                <td>{notice.entrydate.slice(0,16)}</td>
              </tr>
              <tr>
                <th scope="row">Notice Title</th>
                <td>{notice.title}</td>
              </tr>
              <tr>
                <th scope="row">Message Title</th>
                <td>{notice.message}</td>
              </tr>
            </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentNotice;
