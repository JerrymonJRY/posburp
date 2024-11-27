import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import Footer from "../../layouts/Footer";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConfig from '../../layouts/base_url';

const ViewIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Fetch ingredients
  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/ingredient/getalling`)
      .then((res) => {
        setIngredients(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load ingredients!");
      });
  }, []);

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = ingredients.filter((item) =>
      item.name.toLowerCase().includes(value) ||
      item.category.categoryname.toLowerCase().includes(value) ||
      String(item.purchaseprice).toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  // Deactivate ingredient
  const confirmDeactivate = (id) => {
    if (window.confirm("Are you sure you want to deactivate this ingredient?")) {
      axios
        .put(`${apiConfig.baseURL}/api/ingredient/deactivate/${id}`)
        .then(() => {
          toast.success("Ingredient deactivated successfully!");
          const updatedData = ingredients.map((item) =>
            item._id === id ? { ...item, status: 1 } : item
          );
          setIngredients(updatedData);
          setFilteredData(updatedData);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to deactivate ingredient!");
        });
    }
  };

  // Activate ingredient
  const confirmActivate = (id) => {
    if (window.confirm("Are you sure you want to activate this ingredient?")) {
      axios
        .put(`${apiConfig.baseURL}/api/ingredient/activate/${id}`)
        .then(() => {
          toast.success("Ingredient activated successfully!");
          const updatedData = ingredients.map((item) =>
            item._id === id ? { ...item, status: 0 } : item
          );
          setIngredients(updatedData);
          setFilteredData(updatedData);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to activate ingredient!");
        });
    }
  };

  // Columns for DataTable
  const columns = [
    {
      name: "Sl No",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.category.categoryname,
    },
    {
      name: "Purchase Price",
      selector: (row) => row.purchaseprice,
    },
    {
      name: "Alert Quantity/Amount",
      selector: (row) => row.alertquantity,
    },
    {
      name: "Unit",
      selector: (row) => row.ingredientunit.unitname,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/editingredients/${row._id}`} className="btn btn-primary btn-sm mr-2">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </Link>
          {row.status === 0 ? (
            <button
              onClick={() => confirmDeactivate(row._id)}
              className="btn btn-success btn-sm"
            >
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </button>
          ) : (
            <button
              onClick={() => confirmActivate(row._id)}
              className="btn btn-danger btn-sm"
            >
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
                  <h4 className="card-title">Food Ingredients List</h4>
                  <div className="d-flex justify-content-end">
                    <Link to="/addingredients" className="btn btn-success">
                      Add +
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
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ViewIngredients;
