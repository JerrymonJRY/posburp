import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from 'axios';
import apiConfig from '../../layouts/base_url';
import ReactToPrint   from "react-to-print";

const RunningOrderKot =({kotdata,showkotModal,setShowKotModal}) =>
{
    const componentRef = useRef();

    const kotModalRef = useRef();
  
    const handlePrint = () => {
      if (kotModalRef.current) {
        // Use ReactToPrint to handle the print action for the KOT modal
        kotModalRef.current.handlePrint();
      }
    }
    return (
        <div>
   
        <div className={`modal ${showkotModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showkotModal ? 'block' : 'none' }} ref={kotModalRef}>
               <div className="modal-dialog" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">KOT</h5>
                     <button type="button" className="close" onClick={() => setShowModal(false)}>
                       <span aria-hidden="true">&times;</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     {/* Display the data here */}
                     
                     { kotdata ? (
       kotdata.map((order) => (
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
                       <h6 className="text-right">Total :{order.total}</h6>
                       <h6 className="text-right">Vat Amount :{order.vatAmount}</h6>
                       <h6 className="text-right">Grand Total :{order.grandTotal}</h6>
       
                  
       
                       <div className="modal-footer">
                       {/* <button type="button" onClick={handlePrint}  className="btn btn-outline-primary" >Print</button>  */}
                   <ReactToPrint
               trigger={() => <button onClick={handlePrint}>Print KOT</button>}
               content={() => kotModalRef.current}
             />
                   
                     <button type="button" className="btn btn-outline-secondary" onClick={() => setShowKotModal(false)}>Close</button>
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
             <div className={`modal-backdrop ${showkotModal ? 'show' : ''}`} style={{ display: showkotModal ? 'block' : 'none' }}></div>
             
             
           </div>
    )
}

export default RunningOrderKot;