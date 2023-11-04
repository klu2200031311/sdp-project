import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student profile data when component mounts
    axios.get('http://localhost:8081/studentProfile')
      .then(response => {
        setStudentProfile(response.data.Result);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student profile:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!studentProfile) {
    return <div>Student profile not found.</div>;
  }
  return (
    <div>
      <div className="card" style={{ borderColor: "red" }}>
        <div className="card-body">
          <div className="text-center">
            <h5 className="card-title" style={{ color: "red" }}>
               Student Profile
            </h5>
          </div>
          <hr style={{ backgroundColor: "green", height: "2px" }} />
          <table className="table table-bordered border-primary">
            <tbody>
              <tr>
                <th scope="row">Student Name</th>
                <td>{studentProfile[0].studentname}</td>
                <th scope="row">Student Id</th>
                <td>{studentProfile[0].studentid}</td>
              </tr>
              <tr>
                <th scope="row">Student Photo</th>
                <td>
                  <img
                    src={`http://localhost:8081/images/${studentProfile[0].image}`}
                    style={{ width: "70px" }}
                  />
                </td>

                <th>Student Class/Section</th>
                <td>
                {studentProfile[0].classname}/[{studentProfile[0].section}]
                </td>
              </tr>
              <tr>
                <th scope="row">Date of Birth</th>
                <td>{studentProfile[0].birth}</td>

                <th>Gender</th>
                <td>{studentProfile[0].gender}</td>
              </tr>
              <tr>
                <th scope="row">Father Name</th>
                <td>{studentProfile[0].father}</td>

                <th>Mother Name</th>
                <td>{studentProfile[0].mother}</td>
              </tr>
              <tr>
                <th scope="row">Contact No.</th>
                <td>{studentProfile[0].contact}</td>

                <th>Alternate Number</th>
                <td>{studentProfile[0].altcontact}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{studentProfile[0].address}</td>

                <th>Date of Admission</th>
                <td>{studentProfile[0].entrydate.slice(0, 16)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Profile;
