import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewPurchase =() =>
{
  const [data , setData] =useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
      axios.get(`${apiConfig.baseURL}/api/purchase/all`)
          .then((res) => {
              setData(res.data);
              setFilteredData(res.data); // Initialize filtered data
          })
          .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter(
        (item) =>
            item.invoicenumber.toLowerCase().includes(value) ||
            item.supplierDetails.suppliername.toLowerCase().includes(value) ||
            item.invoiceDate.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };


  const columns = [
    {
        name: 'Sl No',
        cell: (row, index) => index + 1,
        width: '80px',
    },
    {
        name: 'Invoice Number',
        selector: row => row.invoicenumber,
        sortable: true,
    },
    {
      name: 'Supplier Name',
      selector: row => row.supplierDetails.suppliername,
      sortable: true,
  },
  {
    name: 'Date',
    selector: row => row.invoiceDate,
    sortable: true,
  },
  {
    name: 'Paid Amount',
    selector: row => row.paidAmount,
    sortable: true,
  },
  {
    name: 'Due Amount',
    selector: row => row.dueAmount,
    sortable: true,
  },
    {
      name: 'Total Amount',
      selector: row => row.grandTotal,
      sortable: true,
  },

    {
        name: 'Action',
        cell: row => (
            <>
                <Link to={`/editPurchase/${row._id}`}  className="btn btn-primary btn-sm mr-2">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </Link>
                <button onClick={() => confirmDelete(row._id)} className="btn btn-danger btn-sm">
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </>
        ),
    },
  ];


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
                    <h4 className="card-title">Purchase List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addPurchase" className="btn btn-success">Add +</Link>
                </div>


                <input
                                      type="text"
                                      placeholder="Search..."
                                      value={searchText}
                                      onChange={handleSearch}
                                      className="form-control mb-3"
                                  />

                                  <DataTable
                                      columns={columns}
                                      data={filteredData}
                                      pagination
                                      highlightOnHover
                                      responsive
                                  />
                  </div>
                </div>
              </div>
                    </div>
                    <Footer />
            </div>
        </div>
        <ToastContainer />
    </div>
    )
}

export default ViewPurchase;