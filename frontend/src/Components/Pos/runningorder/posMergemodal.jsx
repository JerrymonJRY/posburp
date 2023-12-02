import React from "react";
import axios from 'axios';
import apiConfig from '../../layouts/base_url';

const PosMergemodal = ({ mergdata, mergeModal,setMergeModal }) =>{

  




    return(
        <div>
   
        <div className={`modal ${mergeModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mergeModal ? 'block' : 'none' }} >
        <div className="modal-dialog modal-lg" role="document"  style={{ maxWidth: '1200px' }}>
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Merge Orders</h5>
                     <button type="button" className="close" onClick={() => setShowModal(false)}>
                       <span aria-hidden="true">&times;</span>
                     </button>
                   </div>
                   <div className="modal-body">
                       <table className="table table-bordered">
                           <thead>
                             <th>Si No</th>
                             <th>Order Number</th>
                             <th> Amount</th>
                             <th>Vat</th>
                             <th>Grand Total</th>
                           </thead>
                           <tbody>
                           { mergdata ? (
     mergdata.map((order,key) => (
       <tr key={order._id}>
             <td>{key + 1}</td>
             <td>{order.ordernumber}</td>
             <td>{order.total}</td>
             <td>{order.vatAmount}</td>
             <td>{order.grandTotal}</td>
         </tr>
                
                   ))
                   ):(
                     <p>No data dddd</p>
                    
                   )
                 }
                           </tbody>
                       </table>
                   </div>
                   <div className="modal-footer">
                   <button type="button" className="btn btn-outline-secondary" onClick={() => setMergeModal(false)}>Close</button>
                   </div>
       
                  
                
                 </div>
               </div>
             </div>
             <div className={`modal-backdrop ${mergeModal ? 'show' : ''}`} style={{ display: mergeModal ? 'block' : 'none' }}></div>
             
             
           </div>
    )
}

export default PosMergemodal;