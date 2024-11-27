import React from "react";
import { useState,useEffect } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';

import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewFoodMenu =() =>{

  const [foodmenus, setFoodmenu] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    axios
    .get(`${apiConfig.baseURL}/api/foodmenu/getallfoodmenu`)
        .then((res) => {
          setFoodmenu(res.data);
            setFilteredData(res.data); // Initialize filtered data
        })
        .catch((err) => console.log(err));
}, []);




const confirmDeactivate = (id) => {

  const handleDeactivate = async () => {
    // Your deactivate logic goes here
  };

  toast.info(
    <div style={{ width: "280px", textAlign: "center", padding: "15px" }}> {/* Increased width */}
      <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>
        Do You Want Deactivate The Food Menu
      </p>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-danger btn-sm"
          style={{ width: "80px" }}
          onClick={() => {
            handleDeactivate();
            toast.dismiss(); // Dismiss the toast after clicking Yes
          }}
        >
          Yes
        </button>
        <button
          className="btn btn-secondary btn-sm"
          style={{ width: "80px" }}
          onClick={() => toast.dismiss()} // Dismiss the toast without deactivating
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
      style: {
        width: '400px', // Apply custom width to the Toastify container
      },
    }
  );
}


const confirmActivate =(id) =>{

    const handleActivate = async () =>{

    };

    toast.info(
      <div style={{ width: "280px", textAlign: "center", padding: "15px" }}> {/* Increased width */}
        <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>
          Do You Want Activate The Food Menu
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-danger btn-sm"
            style={{ width: "80px" }}
            onClick={() => {
              handleActivate();
              toast.dismiss(); // Dismiss the toast after clicking Yes
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-secondary btn-sm"
            style={{ width: "80px" }}
            onClick={() => toast.dismiss()} // Dismiss the toast without deactivating
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
        style: {
          width: '400px', // Apply custom width to the Toastify container
        },
      }
    );
}


const confirmDelete = (id) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiConfig.baseURL}/api/foodmenu/deletefoodCategory/${id}`);
      const updatedData = foodmenus.filter((item) => item._id !== id);
      setData(updatedData);
      setFilteredData(updatedData);
      toast.success("Food Menu deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete food category!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Custom confirmation toast
  toast.info(
    <div style={{ width: "280px", textAlign: "center", padding: "15px" }}>
      <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>
        Are you sure you want to delete this food category?
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


  const handleExportCsv = async () => {
    try {
      // Make a request to the server to generate and send the CSV file
      const response = await axios.get(`${apiConfig.baseURL}/api/foodmenu/exportfoodmenu`, {
        responseType: 'blob', // Set the responseType to 'blob' for binary data
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'text/csv' });

      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'foodmenu.csv';
      link.click();
    } catch (error) {
      console.error('Error exporting CSV:', error);
      // Handle the error as needed
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = foodmenus.filter(
        (item) =>
            item.foodmenuname.toLowerCase().includes(value) ||
            item.foodcategory.foodcategoryname.toLowerCase().includes(value)||
            item.salesprice.toLowerCase().includes(value)
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
      name: 'Food Menu Name',
      selector: row => row.foodmenuname,
      sortable: true,
  },
  {
      name: 'Food Category Name',
      selector: row => row.foodcategory.foodcategoryname,
  },
  {
    name: 'Sales Price',
    selector: row => row.salesprice,
},
  {
      name: 'Action',
      cell: row => (
          <>

<Link to={`/editfoodmenu/${row._id}`} className="btn btn-primary btn-sm mr-2">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
              </Link>
              {row.status === 0 ? (
                  <button onClick={() => confirmDeactivate(row._id)} className="btn btn-success btn-sm">
                      <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                  </button>
              ) : (
                  <button onClick={() => confirmActivate(row._id)} className="btn btn-danger btn-sm">
                      <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                  </button>
              )}
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
                    <h4 className="card-title">Food Menu List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addfoodmenu" className="btn btn-success">
  Add +
</Link>{' '}
&nbsp;
<button onClick={handleExportCsv} className="btn btn-success">
  Export Foodmenu Csv
</button> {' '}
&nbsp;
<Link to="/importfoodmenu" className="btn btn-success">
  Import Foodmenu Csv
</Link>
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
        <ToastContainer
  style={{ width: '400px', marginLeft: 'auto', marginRight: 'auto' }} // Adjust width here
  position="top-center"
  autoClose={5000}
/>
    </div>
    )
}

export default ViewFoodMenu;