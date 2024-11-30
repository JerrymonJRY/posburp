import React, { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewFoodCategory = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${apiConfig.baseURL}/api/foodcategory/allfoodcategory`)
            .then((res) => {
                setData(res.data);
                setFilteredData(res.data); // Initialize filtered data
            })
            .catch((err) => console.log(err));
    }, []);


    const confirmDelete = (id) => {
      const handleDelete = async () => {
        try {
          await axios.delete(`${apiConfig.baseURL}/api/foodcategory/deletefoodCategory/${id}`);
          const updatedData = data.filter((item) => item._id !== id);
          setData(updatedData);
          setFilteredData(updatedData);
          toast.success("Food category deleted successfully!", {
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
        <div style={{ width: "289px", textAlign: "center", padding: "15px" }}>
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
            const response = await axios.get(`${apiConfig.baseURL}/api/foodcategory/exportfoodcategory`, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'foodcategory.csv';
            link.click();
        } catch (error) {
            console.error('Error exporting CSV:', error);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = data.filter(
            (item) =>
                item.foodcategoryname.toLowerCase().includes(value) ||
                item.description.toLowerCase().includes(value)
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
          name: 'Food Category Name',
          selector: row => row.foodcategoryname,
          sortable: true,
      },
      {
          name: 'Description',
          selector: row => row.description,
      },
      {
          name: 'Action',
          cell: row => (
              <>
                  <Link to={`/editfoodcategory/${row._id}`} className="btn btn-primary btn-sm mr-2">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  {/* <button onClick={() => confirmDelete(row._id)} className="btn btn-danger btn-sm">
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </button> */}
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
                                  <h4 className="card-title">Food Category</h4>
                                  <div className="d-flex justify-content-end mb-3">
                                      <Link to="/addfoodcategory" className="btn btn-success">Add +</Link>
                                      &nbsp;
                                      <button onClick={handleExportCsv} className="btn btn-success">
                                          Export FoodCategory Csv
                                      </button>
                                      &nbsp;
                                      <Link to="/importfoodcategory" className="btn btn-success">
                                          Import FoodCategory Csv
                                      </Link>
                                  </div>

                                  {/* Search Box */}
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

          {/* Toast Container */}
          <ToastContainer />
      </div>
  );
};

export default ViewFoodCategory;