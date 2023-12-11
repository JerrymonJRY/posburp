import React from 'react'
import { useState } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';
const OpenningBalance =({onComplete }) =>{

    const [values,setValues] = useState({

        amount :'',
      
       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleSubmit = (event) => {
      event.preventDefault();
      const validationErrors = validateForm(values);
    
      if (Object.keys(validationErrors).length === 0) {
        axios.post(`${apiConfig.baseURL}/api/openningbalance/create`, values)
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Openning Balance Created!',
              text: 'Your Openning Balance has been created successfully.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            }).then(() => {
              navigate('/pos');
            });
          })
          .catch((err) => console.log(err));
      } else {
        // Set validation errors
        setErrors(validationErrors);
      }
    };


    const validateForm = (data) => {
      let errors = {};
  
      if (!data.amount) {
        errors.amount = "Openning Balance is  required";
      }

      
     
      return errors;
    };

    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Add Openning Balance Account </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Openning Balance</li>
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Amount</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="amount" id="exampleInputUsername2" onChange={e =>setValues({...values, amount: e.target.value})} placeholder="Openning Balance Amount" />
                          {errors.amount && <span className="error">{errors.amount}</span>}
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

export default OpenningBalance;