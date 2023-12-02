import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from 'axios';
import apiConfig from '../layouts/base_url';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const CustomerReport =() =>{
    const [data, setData] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [deliveryNameFilter, setDeliveryNameFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [initialGrandTotal, setInitialGrandTotal] = useState(0);
    const [filteredGrandTotal, setFilteredGrandTotal] = useState(0);
  
    useEffect(() => {
      axios
        .get(`${apiConfig.baseURL}/api/reports/customerreports`)
        .then((res) => {
          setData(res.data);
          setFilteredData(res.data);
  
          // Calculate and set initial Grand Total
          const initialGrandTotal = res.data.reduce((total, order) => {
            return total + parseFloat(order.grandTotal);
          }, 0);
  
          setInitialGrandTotal(initialGrandTotal);
          setFilteredGrandTotal(initialGrandTotal);
  
          // Initialize DataTables after data is loaded
          $(document).ready(function () {
            $('#example_table').DataTable();
          });
        })
        .catch((err) => console.log(err));
    }, []);
  
    useEffect(() => {
      axios
        .get(`${apiConfig.baseURL}/api/reports/getcustomer`)
        .then((response) => {
            setCustomer(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    const options = customer.map((delivery) => ({
      value: delivery._id,
      label: delivery.customername,
    }));
  
    const handleSearch = () => {
      const filtered = data.filter((order) => {
        const deliveryMatches =
          !deliveryNameFilter ||
          order.deliveryInfo.some(
            (delivery) =>
              delivery.customername.toLowerCase().includes(deliveryNameFilter.label.toLowerCase()) ||
              delivery.customermobile.includes(deliveryNameFilter.label)
          );
  
        const startDateMatches = !startDateFilter || new Date(order.date) >= startDateFilter;
  
        const endDateMatches = !endDateFilter || new Date(order.date) <= endDateFilter;
  
        return deliveryMatches && startDateMatches && endDateMatches;
      });
  
      const grandTotal = filtered.reduce((total, order) => {
        return total + parseFloat(order.grandTotal);
      }, 0);
  
      setFilteredGrandTotal(grandTotal);
      setFilteredData(filtered);
    };

    const formatDate = (timestamp) => {
        const dateObject = new Date(timestamp);
        const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
      };
  
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
                    <h4 className="card-title">Customer List</h4>
                    <div className="d-flex justify-content-end">
                      <Link to="/addPurchase" className="btn btn-success">
                        Add +
                      </Link>
                    </div>
  
                    <div className="row">
                      <div className="col-md-3">
                        <Select
                          options={options}
                          value={deliveryNameFilter}
                          onChange={(selectedOption) => setDeliveryNameFilter(selectedOption)}
                        />
                      </div>
  
                      <div className="col-md-3">
                        <DatePicker
                          selected={startDateFilter}
                          className="form-control"
                          placeholderText="Start Date"
                          onChange={(date) => setStartDateFilter(date)}
                        />
                      </div>
  
                      <div className="col-md-3">
                        <DatePicker
                          selected={endDateFilter}
                          className="form-control"
                          placeholderText="End Date"
                          onChange={(date) => setEndDateFilter(date)}
                        />
                      </div>
  
                      <div className="col-md-3">
                        <button className="btn btn-primary" onClick={handleSearch}>
                          Search
                        </button>
                      </div>
                    </div>
  
                    <table className="table table-hover" id="example_table" style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th>Order Number</th>
                          <th>Customer Name</th>
                          <th>Mobile Number</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((order) => (
                          <tr key={order._id}>
                            <td>{order.ordernumber}</td>
                            {order.customerInfo.map((delivery) => (
                              <React.Fragment key={delivery._id}>
                                <td>{delivery.customername}</td>
                                <td>{delivery.customermobile}</td>
                              </React.Fragment>
                            ))}
                            <td>{formatDate(order.date)}</td>
                            <td>{order.grandTotal}</td>
                            <td>
                              <Link to={`/editSupplier/${order._id}`} className="btn btn-primary">
                                Edit
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="4">Initial Grand Total</td>
                          <td>{filteredGrandTotal}</td>
                          <td></td>
                        </tr>
                       
                      </tfoot>
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
  };

export default CustomerReport;