import React from "react";
import { useState,useEffect } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import Swal from 'sweetalert2';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';

const ImportFoodmenu =() =>{

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!file) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please select a CSV file!',
        });
        return;
      }
  
      // Add your API endpoint here
      const apiUrl = `${apiConfig.baseURL}/api/foodmenu/importfoodmenu`;
  
      const formData = new FormData();
      formData.append('csvFile', file);
  
      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Handle success, you can customize this based on your API response
        console.log(response.data);
  
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'File uploaded successfully!',
        });
      } catch (error) {
        // Handle error, you can customize this based on your API response
        console.error(error);
  
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    };

    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Import Foodmenu </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Import Foodmenu</li>
                </ol>
              </nav>
            </div>
            <div className="row">
       
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                  
                    <form className="forms-sample" onSubmit={handleSubmit}  >
                        <div className="row">
                          
                            <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Import Foodmenu</label>
                        <div className="col-sm-9">
                        <input
                      type="file"
                      className="form-control"
                      name="csvFile"
                      id="exampleInputUsername2"
                      accept=".csv"
                      onChange={handleFileChange}
                    />
                        
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
    );
}

export default ImportFoodmenu;