import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";

const PosSplitModal =({ splitdata,setSplitData, showSplitModal,setShowSplitModal }) =>{

    

    const totalGrandTotal = Array.isArray(splitdata)
    ? splitdata.reduce((total, order) => {
        // Sum up the quantities of each cartItem in the order
        const orderTotal = order.cart.reduce((orderTotal, cartItem) => {
          const itemQuantity = parseFloat(cartItem.quantity);
          return !isNaN(itemQuantity) ? orderTotal + itemQuantity : orderTotal;
        }, 0);
  
        return total + orderTotal;
      }, 0)
    : 0;
  
    const totalGrandTotals = Array.isArray(splitdata)
    ? splitdata.reduce((total, order) => {
        // Sum up the quantities of each cartItem in the order
        const orderTotal = order.cart.reduce((orderTotal, cartItem) => {
          const itemQuantity = parseFloat(cartItem.quantity);
          return !isNaN(itemQuantity) ? orderTotal + itemQuantity : orderTotal;
        }, 0);
  
        return total + orderTotal;
      }, 0)
    : 0;
    const optionValues = Array.from({ length: totalGrandTotals - 1 }, (_, index) => index + 2);
  
    const [selectedSplitValue, setSelectedSplitValue] = useState('');
    const [textInputs, setTextInputs] = useState([]);
    const [foodtextInputs, setfoodTextInputs] = useState([]);
  
    const handleSplitChange = (event) => {
      const value = parseInt(event.target.value, 10);
      setSelectedSplitValue(value);
  
      // Create an array with 'value' number of elements
     const newInputs = Array.from({ length: value }, (_, index) => index + 1);
    setTextInputs(newInputs);
    //setfoodTextInputs(Array(value).fill(0));
    };
  
    const handleQuantityDecrease = (orderIndex, cartItemIndex) => {
      if (selectedSplitValue > 0) {
        const updatedSplitData = [...splitdata];
        const order = updatedSplitData[orderIndex];
        const cartItem = order.cart[cartItemIndex];
    
        // Decrease the quantity of the selected food item
        cartItem.quantity = Math.max(0, cartItem.quantity - 1);
    
        // Update the split data with the modified order
        setSplitData(updatedSplitData);
    
        // Update the quantity in the textInputs array for the selected cartItemIndex
        const updatedTextInputs = [...textInputs];
        updatedTextInputs[cartItemIndex] = Math.max(0, updatedTextInputs[cartItemIndex] - 1);
        setTextInputs(updatedTextInputs);
    
        // Update the quantity in the foodtextInputs array for the selected cartItemIndex
        const updatedFoodTextInputs = [...foodtextInputs];
        updatedFoodTextInputs[cartItemIndex] = Math.max(0, updatedFoodTextInputs[cartItemIndex] - 1);
        setfoodTextInputs(updatedFoodTextInputs);
      }
    };
  


    return (
        <div>
   
   <div className={`modal ${showSplitModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showSplitModal ? 'block' : 'none' }}>
   <div className="modal-dialog modal-lg" role="document"  style={{ maxWidth: '1200px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Split Order</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Display the data here */}
                <div className="row">
                <div className="col-md-4">
                {Array.isArray(splitdata) && splitdata.length > 0 ? (
  splitdata.map((order,orderIndex) => (

    
                 <div key={order.id}>
       
                  <table className="table   table-bordered">
                  <thead>
                  <tr>
                      <th>Si No</th>
                      <th>Food Name</th>
                     
                   
                      </tr>
                  </thead>
                  <tbody>
                   
                    {order.cart.map((cartItem,cartItemIndex) => (
                  <tr key={cartItem.foodmenuId}>
                    <td>{cartItemIndex + 1}</td>
                    <td onClick={(event) => handleQuantityDecrease(orderIndex, cartItemIndex,event)}>
                      {cartItem.menuItemDetails.foodmenuname} - ({cartItem.quantity})</td>
                    

                  
                    {/* Render other cart item details here */}
                  </tr>
                ))}
                  
                  </tbody>
                  </table>
                 
  
             
  
               </div>
             
                ))
                ):(
                  <p>No data</p>
                )
              }
                </div>
                <div className="col-md-8">
                  <label htmlFor="">Select Number of Order</label>
                <select className="form-control" onChange={handleSplitChange} value={selectedSplitValue}>
                <option>Select Method</option>
            {optionValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <div className="row">
          {textInputs.map((index) => (
            
               <div className="col-md-6">
                  <div key={index}>
                    <div className="card">
                      <div className="card-header">

                      </div>
                      <div className="card-body">
                          <table className="table table-bordered">
                            <thead>
                              <th>Si No</th>
                              <th>Food Name</th>
                              <th>Quantity</th>
                            </thead>
                            <tbody>
              {foodtextInputs.map((value, foodIndex) => (
                <tr key={foodIndex}>
                  <td>{foodIndex + 1}</td>
                  <td>Food Item</td>
                  {/* Display the quantity only for the selected split order */}
                   <td>{value}</td> 
                </tr>
              ))}
            </tbody>

                          </table>
                      </div>
                    </div>
                 </div>
               </div>

          
      
      ))}
        </div>
                </div>
                </div>
    


              </div>

              <div className="modal-footer">
             
             <button type="button" className="btn btn-outline-secondary" onClick={() => setShowSplitModal(false)}>Close</button>
           </div>
           
            </div>
          </div>
        </div>
        <div className={`modal-backdrop ${showSplitModal ? 'show' : ''}`} style={{ display: showSplitModal ? 'block' : 'none' }}></div>
        
        
      </div>
    );
}

export default PosSplitModal;