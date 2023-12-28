import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../../layouts/base_url';

const PosCashDrop = ({ isModalCashDrop, setModalCashDrop }) => {

  const navigate = useNavigate();

  const handleCloseDropout = () => {
    setModalCashDrop(false);
  }
  const handleHoldSearch = (e) => {
    setholdSearchTerm(e.target.value);

  };

  const drop = [
    { value: 'Drop', label: 'Drop' },
    { value: 'Out', label: 'Out' },

  ];
  const handleCash = (event) => {
    setDropout(event.target.value);
    //  alert({svat});
  }

  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('');
  const [dropout, setDropout] = useState('');
  const [data, setData] = useState([]);
  const [addedby, setuserid] = useState("");
  const [shiftstoken, setShiftstoken] = useState('');

  useEffect(() => {
    const storeid = localStorage.getItem("_id");
    const storetoken = localStorage.getItem('shifttoken');
    setuserid(storeid);
    setShiftstoken(storetoken)
  }, []);

console.log(shiftstoken);
  const handleSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append('amount', amount);
    formData.append('dropout', dropout);
    formData.append('notes', notes);
    formData.append('addedby', addedby);
    formData.append('shiftstoken', shiftstoken);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    axios
      .post(`${apiConfig.baseURL}/api/cashdrop/cashcreate`, formData, config)
      .then(res => {
        console.log(res);
        setModalCashDrop(false);
        navigate("/pos");
      })
      .catch(err => console.log(err));


  }

  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/cashdrop/getCashdrop`)
      .then((res) => {
        setData(res.data);

        // Initialize DataTables after data is loaded

      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div>
      <div className={`modal ${isModalCashDrop ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalCashDrop ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg" role="document" style={{ maxWidth: '1200px' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cash Drop/Out</h5>
              <button type="button" className="close" onClick={handleCloseDropout}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">

                <div className="col-md-12">
                  <table className="table table-bordered">
                    <thead>
                      <th>Si No</th>
                      <th>Amount</th>
                      <th>Drop/Out</th>
                      <th>Notes</th>
                    </thead>
                    <tbody>
                      {
                        data.map((d, i) => (

                          <tr key={i}>
                            <td>
                              {i + 1}
                            </td>
                            <td>
                              {d.amount}
                            </td>

                            <td>
                              {d.dropout}
                            </td>
                            <td>
                              {d.notes}
                            </td>

                          </tr>

                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">

                  <div className="col-md-4">
                    <div class="form-group">
                      <label for="exampleInputUsername1">Amount</label>
                      <input type="text" className="form-control" name="amount" value={amount} onChange={(e) => { setAmount(e.target.value) }} />

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div class="form-group">
                      <label for="exampleInputUsername1">Cash Drop/Out</label>
                      <select name="cashdrop" className="form-control" onChange={handleCash} value={dropout}>
                        {drop.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div class="form-group">
                      <label for="exampleInputUsername1">Notes</label>
                      <input type="text" className="form-control" name="notes" value={notes} onChange={(e) => { setNotes(e.target.value) }} />

                    </div>
                  </div>


                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                  </div>

                </div>
              </form>









            </div>

          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${isModalCashDrop ? 'show' : ''}`} style={{ display: isModalCashDrop ? 'block' : 'none' }}></div>
    </div>
  )
}
export default PosCashDrop;