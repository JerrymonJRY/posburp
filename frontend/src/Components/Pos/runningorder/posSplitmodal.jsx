import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import apiConfig from '../../layouts/base_url';
const PosSplitModal = ({ splitdata, setSplitData, showSplitModal, setShowSplitModal }) => {


  const [cookies, setCookie, removeCookie] = useCookies();
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSplitValue, setSelectedSplitValue] = useState('');
  const [textInputs, setTextInputs] = useState([]);
  const [foodtextInputs, setFoodTextInputs] = useState({});
  const [overallTotal, setOverallTotalPrice] = useState(0);
  const [overallvat, setOverallVat] = useState(0);
  const [overallsubtotal, setOverallSubtotal] = useState(0);


  const [addedby, setuserid] = useState("");
  const [shiftstoken, setShiftstoken] = useState('');
  const [shiftAccess, setShiftAccess] = useState('');


  useEffect(() => {
    const storeid = localStorage.getItem("_id");
    const storetoken = localStorage.getItem('shifttoken');
    const storeaccess = localStorage.getItem('shiftacess');
    setuserid(storeid);
    setShiftstoken(storetoken);
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const id = localStorage.getItem('_id');
          if (!id) {
             console.error('Store ID not found in localStorage');
            return;
          }
          const response = await axios.get(`${apiConfig.baseURL}/api/pos/getShiftAccess`, {
            params: {
              id: id,
            },
          });
         const shiftdata = response.data;
         setShiftAccess(shiftdata.shiftacess);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
    }, []);


  if (!splitdata) {
    return null; 
  }

  const splitDataId = splitdata.map(data => data._id);
  const idsAsString = splitDataId.join(", ");

  const totalGrandTotals = Array.isArray(splitdata)
    ? splitdata.reduce((total, order) => {

      const orderTotal = order.cart.reduce((orderTotal, cartItem) => {
        const itemQuantity = parseFloat(cartItem.quantity);
        return !isNaN(itemQuantity) ? orderTotal + itemQuantity : orderTotal;
      }, 0);

      return total + orderTotal;
    }, 0)
    : 0;
  const optionValues = Array.from({ length: totalGrandTotals - 1 }, (_, index) => index + 2);


  const handleSplitChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedSplitValue(value);

    const newInputs = Array.from({ length: value }, (_, index) => index + 1);
    setTextInputs(newInputs);
    // setFoodTextInputs([]);
    setFoodTextInputs({});
  };

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };



  const handleQuantityDecrease = (orderIndex, cartItemIndex) => {
    if (selectedCard !== null && selectedSplitValue > 0) {
      const updatedSplitData = [...splitdata];
      const order = updatedSplitData[orderIndex];
      const cartItem = order.cart[cartItemIndex];
  
      if (cartItem.quantity > 0) {
        cartItem.quantity = Math.max(0, cartItem.quantity - 1);
  
        const updatedFoodTextInputs = { ...foodtextInputs };
  
        if (!updatedFoodTextInputs[selectedCard]) {
          updatedFoodTextInputs[selectedCard] = [];
        }

       
  
        const existingItem = updatedFoodTextInputs[selectedCard].find(
          (item) => item.foodmenuname === cartItem.menuItemDetails.foodmenuname
        );
  
        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.totalPrice = existingItem.quantity * cartItem.salesprice;
          



        } else {
         
          updatedFoodTextInputs[selectedCard].push({

            foodmenuId: cartItem.foodmenuId,
            foodmenuname: cartItem.menuItemDetails.foodmenuname,
            quantity: 1,
            salesprice: cartItem.menuItemDetails.salesprice,
            totalPrice: cartItem.menuItemDetails.salesprice,
            
          


          });
        }
  
        setFoodTextInputs(updatedFoodTextInputs);
        setSplitData(updatedSplitData);
  
        // Calculate overall total price
        let total = 0;
        updatedFoodTextInputs[selectedCard].forEach((item) => {



          total += item.quantity * item.price;
          const vatPercentValue = 5;
        const vatAmounts = (total * vatPercentValue) / 100;
        
       
        let subtotal = 0;
  
        // updatedFoodTextInputs[selectedCard].forEach((item) => {
          subtotal += item.quantity * item.price;
        // });

        const subtotals =subtotal - vatAmounts;
  
        // Calculate overall total with VAT
        const overallTotalWithVAT = subtotals + vatAmounts;

        
      setOverallVat(vatAmounts);
      setOverallSubtotal(subtotals);

      // Set the overall total price state
      setOverallTotalPrice(overallTotalWithVAT);
         
        });

        
  
       
  

     
      }
    }
  };
  
  






  const resetFoodInputs = () => {
    // setfoodTextInputs([]);
    setFoodTextInputs({});
    setTextInputs([]);
    setSelectedCard("")
    setSelectedSplitValue("")
  };

  const handleModalClose = () => {

    resetFoodInputs();
    setShowSplitModal(false);

  };
  const handleSubmit = (event, index) => {
    event.preventDefault();
  

    if (Object.keys(foodtextInputs).length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Cart is empty',
            text: 'Please add items to your cart before placing an order.',
        });
    } else {
      
        const cart = foodtextInputs[index];
        console.log(cart);



        try {

          const loadid =idsAsString;
          const cart = foodtextInputs[index];
          var posData = new FormData();
          for (let i = 0; i < cart.length; i++) {
            posData.append(`cart[${i}].foodmenuId`, cart[i].foodmenuId);
            posData.append(`cart[${i}].foodmenuname`, cart[i].foodmenuname);
            posData.append(`cart[${i}].salesprice`, cart[i].salesprice);
            posData.append(`cart[${i}].quantity`, cart[i].quantity);

          }
          posData.append('addedby', addedby);
          posData.append('shiftstoken',shiftstoken);
          posData.append('opentoken',shiftAccess);
          const config = { headers: { 'Content-Type': 'application/json' } };

          axios
          .put(`${apiConfig.baseURL}/api/pos/updatesplits/${loadid}`, posData, config)
          

        
         
      } catch (error) {
         
      }


       
    }
}





  return (
    <div>

      <div className={`modal ${showSplitModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showSplitModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg" role="document" style={{ maxWidth: '1200px' }}>
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
                    splitdata.map((order, orderIndex) => (


                      <div key={order.id}>

                        <table className="table   table-bordered">
                          <thead>
                            <tr>
                              <th>Si No</th>
                              <th>Food Name</th>


                            </tr>
                          </thead>
                          <tbody>

                            {order.cart.map((cartItem, cartItemIndex) => (
                              <tr key={cartItem.foodmenuId}>
                                <td>{cartItemIndex + 1}</td>
                                <td onClick={() => handleQuantityDecrease(orderIndex, cartItemIndex)}>
                                  {cartItem.menuItemDetails.foodmenuname} - ({cartItem.quantity})
                                </td>



                                {/* Render other cart item details here */}
                              </tr>
                            ))}

                          </tbody>
                        
                        </table>




                      </div>

                    ))
                  ) : (
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
                      <div
                        className={`col-md-6 card-container ${selectedCard === index ? 'selected-card' : ''}`}
                        key={index}
                        onClick={() => handleCardClick(index)}
                      > <form onSubmit={(event) => handleSubmit(event, index)}>
                        <div key={index} className="card">
                          <div className="">
                            <div className="card-header">
                              {/* ... (Header content) */}
                            </div>
                            <div className="card-body">
                              <table className="table table-bordered">
                                <thead>
                                  <th>Si No</th>
                                  <th>Food Name</th>
                                  <th>Quantity</th>
                                <th>Price</th>
                                </thead>
                                <tbody>
                                  {
                                  // selectedCard === index && // Render only if selectedCard matches the current index
                                  foodtextInputs[index] &&  
                                  foodtextInputs[index].map((value, foodIndex) => (
                                      <tr key={foodIndex}>
                                        <td>{foodIndex + 1}</td>
                                        <td>{value.foodmenuname}</td>
                                        {/* Display the quantity only for the selected split order */}
                                        <td>{value.quantity}</td>
                                        <td>{value.totalPrice}</td>
                                        
                                      </tr>
                                    ))
                                    
                                    
                                    }
                                    
                                </tbody>
                                <tfoot>
 
  <tr>
  <td colSpan="3">Vat Amount</td>
    <td>{overallvat}</td>
  </tr>
  <tr>
  <td colSpan="3">Sub Total</td>
    <td>{overallsubtotal}</td>
  </tr>
  <tr>
    <td colSpan="3">Overall Total</td>
    <td>{overallTotal}</td>
  </tr>
</tfoot>
                              </table>
                              <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                            </div>
                          </div>
                        </div>
                        </form>
                      </div>
                    ))}
                    
                  </div>
                </div>
              </div>



            </div>

            <div className="modal-footer">

              <button type="button" className="btn btn-outline-secondary" onClick={handleModalClose}>
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showSplitModal ? 'show' : ''}`} style={{ display: showSplitModal ? 'block' : 'none' }}></div>


    </div>
  );
}

export default PosSplitModal;