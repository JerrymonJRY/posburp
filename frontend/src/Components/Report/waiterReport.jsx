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
import DataTable from "react-data-table-component";

const WaiterReport = () => {
  const [data, setData] = useState([]);
  const [waiter, setWaiter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [deliveryNameFilter, setDeliveryNameFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/reports/waiterreports`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/reports/getwaiter`)
      .then((response) => {
        setWaiter(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = waiter.map((delivery) => ({
    value: delivery._id,
    label: delivery.waitername,
  }));

  const handleSearch = () => {
    const filtered = data.filter((order) => {
      const deliveryMatches =
        !deliveryNameFilter ||
        order.waiterInfo.some(
          (delivery) =>
            delivery.waitername.toLowerCase().includes(deliveryNameFilter.label.toLowerCase()) ||
            delivery.mobile.includes(deliveryNameFilter.label)
        );

      const startDateMatches = !startDateFilter || new Date(order.date).getTime() >= startDateFilter.getTime();

      const endDateMatches = !endDateFilter || new Date(order.date).getTime() <= endDateFilter.getTime();

      return deliveryMatches && startDateMatches && endDateMatches;
    });

    setFilteredData(filtered);
  };

  const columns = [
    { Header: 'Order Number', accessor: 'ordernumber' },
    {
      Header: 'Waiter Name',
      accessor: 'waiterInfo',
      Cell: ({ row }) => row.original.waiterInfo.map((delivery) => delivery.waitername).join(', '),
    },
    {
      Header: 'Mobile Number',
      accessor: 'waiterInfo',
      Cell: ({ row }) => row.original.waiterInfo.map((delivery) => delivery.mobile).join(', '),
    },
    { Header: 'Date', accessor: (row) => formatDate(row.date) },
    { Header: 'Amount', accessor: 'grandTotal' },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <Link to={`/editSupplier/${row.original._id}`} className="btn btn-primary">
          Edit
        </Link>
      ),
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData });

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
                  <h4 className="card-title">Waiter List</h4>
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

                  <table {...getTableProps()} className="table table-hover" style={{ width: '100%' }}>
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                              <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                          </tr>
                        );
                      })}
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
};

export default WaiterReport;