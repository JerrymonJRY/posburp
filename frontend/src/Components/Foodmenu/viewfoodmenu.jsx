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
  // Show confirmation toast with Yes and No buttons
  const toastId = toast.info(
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
        Are you sure you want to deactivate this food menu item?
      </p>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeactivate(id, toastId)} // Pass the toastId
        >
          Yes
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => toast.dismiss(toastId)} // Dismiss the toast if user clicks No
        >
          No
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false, // Prevent auto-close
      closeOnClick: false, // Disable close on click
      draggable: false, // Disable dragging
      style: { width: '350px' }, // Custom width
    }
  );
};

const handleDeactivate = (id, toastId) => {
  axios
    .put(`${apiConfig.baseURL}/api/foodmenu/deactivatefoodmenu/${id}`)
    .then((res) => {
      // Dismiss the confirmation toast
      toast.dismiss(toastId);

      // Show success notification using react-toastify
      toast.success("Food menu item has been deactivated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Update the frontend state after deactivation
      const updatedData = foodmenus.filter((item) => item._id !== id);
      setFoodmenu(updatedData);
      setFilteredData(updatedData);
    })
    .catch((err) => {
      console.error(err);

      // Show error notification if the API call fails
      toast.error("Failed to deactivate food menu item!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
};


// Deactivation handler function

const confirmActivate = (id) => {
  // Show confirmation toast with Yes and No buttons
  const toastId = toast.info(
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
        Are you sure you want to deactivate this food menu item?
      </p>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleActivate(id, toastId)} // Pass the toastId
        >
          Yes
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => toast.dismiss(toastId)} // Dismiss the toast if user clicks No
        >
          No
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false, // Prevent auto-close
      closeOnClick: false, // Disable close on click
      draggable: false, // Disable dragging
      style: { width: '350px' }, // Custom width
    }
  );
};




    const handleActivate = (id, toastId) =>{
      axios
      .put(`${apiConfig.baseURL}/api/foodmenu/activatefoodmenu/${id}`)
      .then((res) => {
        // Dismiss the confirmation toast
        toast.dismiss(toastId);

        // Show success notification using react-toastify
        toast.success("Food menu item has been Activated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Update the frontend state after deactivation
        const updatedData = foodmenus.filter((item) => item._id !== id);
        setFoodmenu(updatedData);
        setFilteredData(updatedData);
      })
      .catch((err) => {
        console.error(err);

        // Show error notification if the API call fails
        toast.error("Failed to Activate food menu item!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
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