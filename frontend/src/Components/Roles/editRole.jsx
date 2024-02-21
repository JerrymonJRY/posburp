import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';
const EditRole =() =>{

    const {id} =useParams()
    const [rolename,setRoleName] =useState()
    const [description,setDescription] =useState()

  
    const navigate = useNavigate();

    useEffect( ()=>{

        axios.get(`${apiConfig.baseURL}/api/roles/getRole/${id}`)
        .then(res => { console.log(res)
            setRoleName(res.data.rolename)
            setDescription(res.data.description)
        
    })
        .catch(err =>console.log(err));

    },[])


    // const handleSubmit =(event) =>{

    //     event.preventDefault();
    //     axios.put(`${apiConfig.baseURL}/api/vat/updateVat/${id}`,{vatname,percentage})
    //     .then(res =>{

    //         console.log(res);
    //         navigate('/viewVat');
    //     })
    //     .catch(err =>console.log(err));
    // }

    const handleSubmit = (event) => {
      event.preventDefault();
      axios
        .put(`${apiConfig.baseURL}/api/roles/updateRoles/${id}`, { rolename, description })
        .then((res) => {
          console.log(res);
  
          // Display success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Role Updated!',
            text: 'Your Role has been updated successfully.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          }).then(() => {
            navigate('/viewroles');
          });
        })
        .catch((err) => {
          console.log(err);
          // Handle error and display an error message if needed
        });
    };

   
    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Edit Role </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Edit Role</li>
                </ol>
              </nav>
            </div>
            <div className="row">
       
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                  
                    <form className="forms-sample" onSubmit={handleSubmit} >
                        <div className="row">
                          
                            <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Role Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="rolename" id="exampleInputUsername2" value={rolename} onChange={(e)=>setRoleName(e.target.value)} placeholder="Food Description" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="description" id="exampleInputUsername2" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Food Category" />
                        </div>
                      </div>
                      
                    
                           
                      
                        </div>
                   
                      <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                     
                    </form>
                  </div>
                </div>
              </div>
 
   

      
            </div>
          </div>
                    <Footer />
            </div>
        </div>
    </div>
    )
}

export default EditRole;