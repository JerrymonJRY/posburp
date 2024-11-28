import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../layouts/base_url';
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewExpenseInvoice =() =>{



  const [data , setData] =useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiConfig.baseURL}/api/expenseinvoice/allexpenseinvoice`)
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
          item.expense.expensename.toLowerCase().includes(value) ||
          item.amount.toLowerCase().includes(value)||
          item.date.toLowerCase().includes(value)
  );
  setFilteredData(filtered);
};

const confirmDelete = (id) => {
  const handleDelete = async () => {
    try {
      axios.delete(`${apiConfig.baseURL}/api/expenseinvoice/deleteexpenseinvoice/${id}`)
      const updatedData = data.filter((item) => item._id !== id);
      setData(updatedData);
      setFilteredData(updatedData);
      toast.success("Ingredient Unit List Deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Ingredient Unit!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Custom confirmation toast
  toast.info(
    <div style={{ width: "289px", textAlign: "center", padding: "15px" }}>
      <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>
        Are you sure you want to delete this Ingredient Unit?
      </p>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-danger btn-sm"
          style={{ width: "80px" }}
          onClick={() => {
            handleDelete();
            toast.dismiss(); // Dismiss the toast after clicking Yes
          }}
        >
          Yes
        </button>
        <button
          className="btn btn-secondary btn-sm"
          style={{ width: "80px" }}
          onClick={() => toast.dismiss()} // Dismiss the toast without deleting
        >
          No
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false, // Prevent auto close for confirmation toast
      closeOnClick: false,
      draggable: false,
    }
  );
};



const columns = [
  {
      name: 'Sl No',
      cell: (row, index) => index + 1,
      width: '80px',
  },
  {
      name: 'Expense Name',
      selector: row => row.expense.expensename,
      sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row.amount,
    sortable: true,
},
{
  name: 'Date',
  selector: row => new Date(row.date).toLocaleDateString(),
  sortable: true,
},

{
  name: 'Added By',
  selector: row => `${row.user.firstname} ${row.user.lastname}`,

},

  {
      name: 'Action',
      cell: row => (
          <>
              <Link to={`/editExpenseinvoice/${row._id}`}  className="btn btn-primary btn-sm mr-2">
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
                    <h4 className="card-title">Expense List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addExpenseinvoice" className="btn btn-success">Add +</Link>
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
            <ToastContainer />
        </div>
    </div>
    );
}
export default ViewExpenseInvoice;