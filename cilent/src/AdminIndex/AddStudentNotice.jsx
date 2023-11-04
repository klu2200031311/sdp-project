import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddStudentNotice() {
  
  const [data, setData] = useState({
    title: '',
    classname: '',
    message: '',
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

    try {
      await axios.post('http://localhost:8081/addStudentNotice', data);
      alert('Notice added successfully');
      navigate('/manageStudentNotice');
    } catch (error) {
      console.log(error);
    }
    navigate('/manageStudentNotice');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    })); 
  };

  return (
    <div>
         <div className="col-md-11 grid-margin stretch-card">
              <div className="card">
              <div className="card">
                <div style={{backgroundColor:"#57c7d4",height:"40px"}}>
                 <h4 style={{marginLeft:"25px",marginTop:"10px",marginBottom:"10px",color:"black"}} className="card-title">Add New Notice</h4>
                 </div>
                <div className="card-body">
                  <form className="forms-sample" onSubmit={handleSubmit} >
                    <div className="form-group">
                      <label for="exampleInputUsername1">Notice Title</label>
                      <input type="text" className="form-control" name='title' onChange={handleInputChange}
                      autoComplete='off'
                      required id="exampleInputUsername1"
                      placeholder="Enter Notice Title"/>
                    </div>

                    <div className="form-group">
                  <label for="exampleInputUsername1">Student Class</label>
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

                    <div className="form-group">
                      <label for="exampleInputUsername1">Notice Title</label>
                      <textarea rows={4} type="text" className="form-control" name='message' onChange={handleInputChange}
                      autoComplete='off'
                      required id="exampleInputUsername1"
                      placeholder="Enter Message"/>
                    </div>

                    <br/>
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                  </form>
                </div>
              </div>
            </div>
            </div>
</div>
  )
}

export default AddStudentNotice