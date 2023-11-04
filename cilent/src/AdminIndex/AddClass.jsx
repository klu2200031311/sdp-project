import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddClass() {
  
  const [data, setData] = useState({
    classname: '',
    section: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8081/addClass', data);
      alert('Class added successfully');
      navigate('/manageclass');
    } catch (error) {
      console.log(error);
    }
    navigate('/manageclass');
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
                 <h4 style={{marginLeft:"25px",marginTop:"10px",marginBottom:"10px",color:"black"}} className="card-title">Add Class</h4>
                 </div>
                <div className="card-body">
                  <form className="forms-sample" onSubmit={handleSubmit} >
                    <div className="form-group">
                      <label for="exampleInputUsername1">Class Name</label>
                      <input type="text" className="form-control" name='classname' onChange={handleInputChange}
                      autoComplete='off'
                      required id="exampleInputUsername1"
                      placeholder="Enter Class Name"/>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputConfirmPassword2">Section</label>
                      <select type="text" className="form-control" name='section' onChange={handleInputChange}
                      autoComplete='off' id="exampleInputConfirmPassword2" required>
                        <option>Select Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                      </select>
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

export default AddClass