import React, { useState } from 'react'
import './AddUser.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddUser() {
  let navigate = useNavigate();
  let { register, handleSubmit, formState: { errors } } = useForm();
  let [err, setErr] = useState([]);
  let addNewUser = (userObj) => {
    console.log(userObj)
    // Creating http post request
    axios.post("http://localhost:4000/users", userObj)
      .then(response => {
        console.log(response)
        if (response.status === 201)
        {
          setErr("");
          navigate("/users");
        }
      })
      .catch(err => {
        if (err.response) // 404 error or invalid url error {4xx,5xx} client side failure
        {
          setErr(err.message)
          console.error(err)
        }
        else if (err.request)
        {
          setErr(err.message)       //network failure error
          console.error(err)
        } 
        else
        {
          setErr(err.message)       // some other error
          console.error(err)
        } 
    })
  }
  return (
    <div>
      <h1 className="display-6 text-center mt-1">Add New User</h1>
      {/* HTTP error message */}
      {err.length !== 0 && <p className='display-3 text-danger text-center'>{err}</p>}
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(addNewUser)}>
            {/* Name */}
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" {...register("name", { required: true })} id="name" placeholder='ex: Rohith' className="form-control mb-2" />
              {errors.name?.type==="required" && <p className='text-danger'>* Name is required</p>}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" {...register("email", { required: true })} id="email" placeholder='ex: xyz@gmail.com' className="form-control mb-2" />
              {errors.email?.type==="required" && <p className='text-danger'>* Email is required</p>}
            </div>
            {/* Date of birth */}
            <div>
              <label htmlFor="dob">Date Of Birth</label>
              <input type="date" {...register("dob", { required: true })} id="date" className="form-control mb-2" />
              {errors.dob?.type==="required" && <p className='text-danger'>* Date Of Birth is required</p>}
            </div>
            {/* Image */}
            <div>
              <label htmlFor="image">Image</label>
              <input type="text" {...register("image", { required: true })} id="image" className="form-control mb-2" />
              {errors.image?.type==="required" && <p className='text-danger'>* Image is required</p>}
            </div>
            <button type='Submit' className="btn btn-success">Add New User</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUser