import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from 'axios';
import apiConfig from '../../layouts/base_url';
import Swal from 'sweetalert2';
const RunningPaymentModal =({data,showModal,setShowModal}) =>{

    const [payments,setPays] =useState();
    const payment  = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Card', label: 'Card' },
       
      ];

      
  
    const handlePays = (event) => {
        setPays(event.target.value);
        
      //  alert({svat});
       }
  

    const handleMakePayment =(id) =>
{
  
  var formData = new FormData();
  formData.append("paymentType", payments);
  //formData.append("foodmenuname", foodmenuname);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  const url = `${apiConfig.baseURL}/api/pos/updatePayment/${id}`;

  axios.put(url,formData, config)
  .then(res => {
    Swal.fire({
      title: 'Success!',
      text: 'Do you want to print the order?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, print',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // Open your print modal here
        console.log(res);
      setRefresh((prevRefresh) => !prevRefresh);
       // openPrintModal(res.data);
      } else {
        navigate('/posorder');
      }
    });
  })
  .catch(err => console.log(err));
}
    return (
        <div>
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
               <div className="modal-dialog" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Order Details</h5>
                     <button type="button" className="close" onClick={() => setShowModal(false)}>
                       <span aria-hidden="true">&times;</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     {/* Display the data here */}
                     
                     { data ? (
       data.map((order) => (
                      <div key={order.id}>
                      <h5>Order Number: {order.ordernumber}</h5>
                      <h6>Options: {order.options}</h6>
                      <h6>Customer Name:{order.customerDetails ? order.customerDetails.customername : 'N/A'}</h6>
             <h6>Table:{order.tableDetails ? order.tableDetails.tablename : 'N/A'}</h6>
             <h6>Waiter {order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</h6>
                       <table className="table   table-bordered">
                       <thead>
                       <tr>
                           <th>Si No</th>
                           <th>Food Name</th>
                           <th>Quanity</th>
                           <th>Price</th>
                           </tr>
                       </thead>
                       <tbody>
                        
                         {order.cart.map((cartItem,key) => (
                       <tr key={cartItem.foodmenuId}>
                         <td>{key + 1}</td>
                         <td>{cartItem.menuItemDetails.foodmenuname}</td>
                         <td>{cartItem.quantity}</td>
                         <td>{cartItem.salesprice}</td>
                        
                         {/* Render other cart item details here */}
                       </tr>
                     ))}
                       
                       </tbody>
                       </table>
                       <h6>Total :{order.total}</h6>
                       <h6>Vat Amount :{order.vatAmount}</h6>
                       <h6>Grand Total :{order.grandTotal}</h6>
       
                       <div className="form-group row">
                               <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Select Payment</label>
                               <div className="col-sm-9">
                               <select className="form-control" onChange={handlePays}  value={payments}>
                                 <option>Select Payment</option>
                                 {payment.map(option => (
               <option key={option.value} value={option.value}>
                 {option.label}
               </option>
             ))}
                               </select>
                               
                               </div>
                             </div>
       
                       <div className="modal-footer">
                       <button type="button" className="btn btn-outline-primary" onClick={(e) => handleMakePayment(order._id)}>Pay Now</button> 
                     <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Close</button>
                   </div>
          
                    </div>
                  
                     ))
                     ):(
                       <p>No data</p>
                     )
                   }
                   </div>
                
                 </div>
               </div>
             </div>
             <div className={`modal-backdrop ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
           </div>
    )
}

export default RunningPaymentModal;