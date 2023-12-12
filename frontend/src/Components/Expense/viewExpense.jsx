import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../layouts/base_url';
const ViewExpense =() =>{


  const [data , setData] =useState([]);
  const navigate = useNavigate();
  useEffect( ()=>{

      axios.get(`${apiConfig.baseURL}/api/expense/allexpense`)
      .then((response) => {
        setData(response.data);

        // Initialize DataTables after data is loaded
        $(document).ready(function () {
          $('#example_table').DataTable();
        });
      })
      .catch((err) => console.log(err));
  }, []);

console.log(data);



 
  

    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
                  <div className="content-wrapper">
                  <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Expense List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addExpense" className="btn btn-success">Add +</Link>
                </div>
                  
                    <table className="table table-hover"  id="example_table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Expense Name</th>
                          <th>Added By</th>
                        <th>Action</th>
                        </tr>
                      </thead>
               
<tbody>
  {data.map((d, i) => (
    <tr key={i}>
      <td>{d.expensename}</td>
      <td>{d.addedby && d.addedby.fullName}</td> {/* Corrected access to fullName */}
      <td>
        <Link to={`/editVat/${d._id}`} className="btn btn-primary">
          Edit
        </Link>
        <button  className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
                    </table>
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
export default ViewExpense;