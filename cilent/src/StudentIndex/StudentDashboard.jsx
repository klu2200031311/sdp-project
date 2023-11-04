import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentDashboard() {
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
        <div class="container-fluid">
              <div class="row">
                <div class="col-xl-12 col-md-12 mb-4">
                  <div class="card border-left-primary border-right-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="h5 mb-0 font-weight-bold text-gray-800" style={{marginLeft:"400px"}}>
                            Hello  <Link style={{color:"red"}}>{studentProfile[0].studentname}</Link> !!Welcome to Student Panel
                          </div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-user fa-2x" style={{color:"blue"}}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default StudentDashboard