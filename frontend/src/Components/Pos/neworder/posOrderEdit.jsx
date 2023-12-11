import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for react-toastify
import apiConfig from '../../layouts/base_url';

const PosOrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodCategory, setFoodcategory] = useState([]);
  const distinctCategories = [...new Set(foodCategory.map(item => item.foodcategory.foodcategoryname))];
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [vatAmount, setTotalVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get(`${apiConfig.baseURL}/api/pos/getEdit/${id}`)
      .then((response) => {
        const orderData = response.data;

       
        const foodmenuIds = orderData.map(order => (
          order.cart.map(item => item.menuItemDetails._id)
        )).flat();

      
        setMenu(foodmenuIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`${apiConfig.baseURL}/api/pos/posfood`)
      .then((response) => {
        setFoodcategory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const addProductToCart = async (menu) => {
    let findProductInCart = cart.find(i => i._id === menu.foodmenuIds);
    let newCart = [];

    if (findProductInCart) {
      let newItem;

      cart.forEach(cartItem => {
        if (cartItem._id === menu._id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);

      // Trigger toast for adding to cart
      toast(`Added ${menu.foodmenuname} to the cart`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

    } else {
      let addingProduct = {
        ...menu,
        'quantity': 1,
        'totalAmount': menu.salesprice,
      }

      setCart([...cart, addingProduct]);

      // Trigger toast for adding to cart
      toast(`Added ${menu.foodmenuname} to the cart`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  const removeProduct = async (menu) => {
    const newCart = cart.filter(cartItem => cartItem._id !== menu._id);
    setCart(newCart);
  }

  useEffect(() => {
    let newTotalAmount = 0;
    let newVatAmount = 0;

    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + icart.quantity * parseInt(icart.totalAmount);
      newVatAmount = parseInt(icart.vat.percentage) !== 0 ? newVatAmount + icart.quantity * parseInt(icart.salesprice) * (parseInt(icart.vat.percentage) / 100) : newVatAmount;
    })

    setTotalAmount(newTotalAmount);
    setTotalVat(newVatAmount.toFixed(2));
    setGrandTotal((newTotalAmount + newVatAmount).toFixed());
  }, [cart])

  const handleIncrement = (prod) => {
    const { _id } = prod;
    let addQuantity = cart.map(item => {
      if (item._id === prod._id) {
        item.quantity = item.quantity + 1;
      }
      return item;
    })
    setCart(addQuantity);
  }

  const handleDecrement = (prod) => {
    const { _id } = prod;
    let addQuantity = cart.map(item => {
      if (item._id === _id) {
        item.quantity = item.quantity > 1 ? item.quantity - 1 : 1;
      }
      return item;
    })
    setCart(addQuantity);
  }

  return (
    <div className="row">
           <div className="col-sm-4 col-lg-auto">
        <div className="wraper shdw">

          <div className="table-responsive vh-70" style={{ height: "300px", overflowY: "scroll" }}>
            <table className="table ">
              <thead>
                <tr className="thead-light">
                  <th >No.</th>
                  <th>Name</th>
                  <th >U.Price</th>
                  <th >Qty</th>

                  {/* <th scope="col">Total</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody >
                {cart ? cart.map((cartProduct, key) => <tr key={key}>
                  {/* <td>{cartProduct._id}</td> */}
                  <td>{key + 1}</td>
                  <td>{cartProduct.foodmenuname}</td>
                  <td>{cartProduct.salesprice}</td>
                  <td><button className='btn btn-danger btn-sm cartminus' onClick={() => handleDecrement(cartProduct)}>-</button><input type="text" style={{ width: '20px' }} value={cartProduct.quantity} /><button className='btn btn-success btn-sm cartplus' onClick={() => handleIncrement(cartProduct)}>+</button></td>

                  {/* <td>{cartProduct.totalAmount}</td> */}
                  <td>
                    <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>x</button>
                  </td>

                </tr>)

                  : 'No Item in Cart'}


              </tbody>
            </table>
          </div>

          <div className="table-responsive">
            <table className="table">
              <tr>
                <td>Total </td>
                <th className="text-right">${totalAmount}</th>
              </tr>
              <tr>
                <td >Discount  </td>
                <th className="text-right"></th>
              </tr>
              <tr>
                <td>VAT </td>
                <th className="text-right">${vatAmount}</th>
              </tr>
              <tr>
                <th>Grand Total   </th>
                <th className="text-right">{grandTotal}</th>
              </tr>
              <tr>
                <td>

                 
                </td>
                <th ></th>
              </tr>
            </table>
          </div>

          <div className="row">
            <div className="col-lg-6"><button type="button" className="btn btn-danger w-100 mb-2 p-2">Cancel</button></div>
            <div className="col-lg-6 pl-0"><button type="button"  className="btn btn-warning w-100 mb-2 p-2">Place Order</button></div>
            <div className="col-lg-6"><button type="button"  className="btn btn-danger w-100 mb-2 p-2">Hold</button></div>
            <div className="col-lg-6 pl-0"><button type="button" className="btn btn-success w-100 mb-2 p-2">Quick Pay</button></div>
          </div>
        </div>
      </div>
      <div className="col-sm-7 col-lg-7">
        <div className="tbl-h">
          <ul className="nav nav-tabs nav-justified" role="tablist">
            <li className="nav-item">
              <a className="nav-link pos active"  data-toggle="tab" href="#foodmenu" role="tab" aria-controls="duck2" aria-selected="true"><IoFastFoodSharp className="mr-2" />Food Menu</a>
            </li>
          </ul>
        </div>
        <div className="tab-content mt-3">
          <div className="tab-pane active" id="foodmenu" role="tabpanel" aria-labelledby="duck-tab">
            <div className="tbl-h">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search foodmenu..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control"
                />
              </div>
              <ul className="nav nav-pills flex-columns shdw-lft " id="myTab" role="tablist">
                {distinctCategories.map((category, index) => (
                  <li className="nav-item">
                    <a
                      key={index}
                      className={`nav-item nav-link ${index === activeTab ? 'active' : ''}`}
                      onClick={() => setActiveTab(index)}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tab-content p-3" id="myTabContents">
              {isLoading ? 'Loading' : <div className="row">
                {foodCategory.length > 0 &&
                  foodCategory
                    .filter(item => item.foodcategory.foodcategoryname === distinctCategories[activeTab] &&
                      item.foodmenuname.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((menu, index) => (
                      <div className="col-sm-3 col-sm-3" key={index}>
                        <div className="menu-box" onClick={() => addProductToCart(menu)}>
                          <div className="menu-div">
                            <h6 className="mt-2">{menu.foodmenuname}</h6>
                            <p>Price: {menu.salesprice}</p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PosOrderEdit;
