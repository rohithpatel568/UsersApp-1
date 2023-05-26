import React, { useEffect } from 'react'
import './Users.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form'
function Users() {
  let { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm()
  let [err, setErr] = useState([]);
  let [user, setUser] = useState([]);
  //modal state
  let [show, setShow] = useState(false)
  let showModal = () => setShow(true)
  let closeModal = () => setShow(false)
  let navigate = useNavigate();
  let goToAddNewUser = () => {
    navigate("/")
  }
  // user to edit state
  let [userToEdit, setUserToEdit] = useState("");
  let editUser = (userObjToBeEdited) => {
    showModal();
    setUserToEdit(userObjToBeEdited)
    // fill input fields with user details
    setValue("name", userObjToBeEdited.name)
    setValue("email", userObjToBeEdited.email)
    setValue("dob", userObjToBeEdited.dob)
    setValue("image",userObjToBeEdited.image)
  }
  let getUser = () => {
    axios.get("http://localhost:4000/users")
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch((err) => {
        if (err.response) // 404 error or invalid url error {4xx,5xx} client side failure
        {
          setErr(err.message)
          console.error(err)
        }
        else if (err.request) {
          setErr(err.message)       //network failure error
          console.error(err)
        }
        else {
          setErr(err.message)       // some other error
          console.error(err)
        }
      })
  }
  let saveUser = () => {
    closeModal();
    //get modifies user data
    let modifiedUser = getValues();
    console.log(modifiedUser)
    // make http put request
    modifiedUser.id = userToEdit.id;
    axios.put(`http://localhost:4000/users/${modifiedUser.id}`, modifiedUser)
      .then(response => {
        if (response.status === 200) {
          setErr("");
          getUser();
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
  let deleteUser = (userObjToBeEdited) => {
    let deleteId = userObjToBeEdited.id;
    axios.delete(`http://localhost:4000/users/${deleteId}`)
    getUser();
  }
  console.log(err);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <h1 className="display-6 text-center">Users</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {
          user.map(userObj => <div className='col mx-auto' key={userObj.id}>
            <div className="card mx-auto">
              <img src={userObj.image} className='mx-auto p-4 profile-image' alt="" />
              <div className="card-body">
                <h1 className='text-center text-info text-capitalize'>{userObj.name}</h1>
                <h5 className="text-center text-black">{userObj.email}</h5>
                <h5 className="text-center text-black">DOB: {userObj.dob}</h5>
                <div className="forEditAndDelete">
                  {/* edit button */}
                  <button className="btn btn-warning float-start" onClick={()=>editUser(userObj)}>Edit</button>
                  {/* delete button */}
                  <button className="btn btn-danger float-end" onClick={()=>deleteUser(userObj)}>Delete</button>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
      <Modal show={show} onHide={closeModal} backdrop="static" centered className='modal'>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit()}>
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
              <input type="text" {...register("image", { required: true })} disabled id="image" className="form-control mb-2" />
              {errors.image?.type==="required" && <p className='text-danger'>* Image is required</p>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveUser}>Save</Button>
        </Modal.Footer>
      </Modal>
      <button className="btn mb-3 mt-3 btn-danger" onClick={goToAddNewUser}>Add New User</button>
    </div>
  )
}

export default Users