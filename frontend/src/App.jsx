
import React, { Suspense, lazy,useState,useEffect   } from 'react';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

const Login =lazy(() => import('./Components/userPages/login'));
const Dashboard =lazy(()=> import('./Components/Dashboard/dashboard'));
const AddCategory =lazy(() =>import('./Components/Category/AddCategory'));
const ViewCategory =lazy(() =>import('./Components/Category/ViewCategory'));
const ViewIngredientUnit =lazy(() =>import('./Components/Ingredient/unit/viewIngredientUnit'));
const AddIngredientUnit =lazy(() =>import('./Components/Ingredient/unit/AddIngredientUnit'));
const ViewIngredients =lazy(() =>import('./Components/Ingredient/ingredients/viewingredients'));
const AddIngredients =lazy(() =>import('./Components/Ingredient/ingredients/addingredients'));
const AddVat =lazy(() =>import('./Components/vat/addVat'));
const ViewVat =lazy(() =>import('./Components/vat/viewVat'));


import AddTable from './Components/table/addTable'
import ViewTable from './Components/table/viewTable'
import AddFoodCategory from './Components/Foodcategory/addFoodcategory'
import ViewFoodCategory from './Components/Foodcategory/viewFoodcategory'
import AddFoodMenu from './Components/Foodmenu/addfoodmenu'
import ViewFoodMenu from './Components/Foodmenu/viewfoodmenu'
import EditCategory from './Components/Category/EditCategory'
import Pos from './Components/Pos/Pos'
import EditFoodCategory from './Components/Foodcategory/editFoodcategory'
import EditIngredientUnit from './Components/Ingredient/unit/EditIngredientUnit'
import EditTable from './Components/table/editTable'
import EditVat from './Components/vat/editVat'
import AddWaiter from './Components/Waiter/addWaiter'
import ViewWaiter from './Components/Waiter/viewWaiter'
import EditWaiter from './Components/Waiter/editWaiter'
import ViewCustomer from './Components/Customer/viewCustomer'
import AddCustomer from './Components/Customer/addCustomer'
import EditCustomer from './Components/Customer/editCustomer'
import ViewPosOrder from './Components/Orders/viewPosorder'
import ViewPosOrderdetails from './Components/Orders/viewOrderdetails'
import ViewDelivery from './Components/Delivery/viewDelivery';
import AddDelivery from './Components/Delivery/addDelivery';
import ViewSupplier from './Components/Supplier/viewSupplier';
import AddSupplier from './Components/Supplier/addSupplier';
import Spinner from './Components/layouts/Spinner';
import ViewPurchase from './Components/Purchase/viewPurchase';
import AddPurchase from './Components/Purchase/addPurchase';
import EditPurchase from './Components/Purchase/editPurchase';
import DeliveryReport from './Components/Report/deliveryReport';
import CustomerReport from './Components/Report/customerReport';
import WaiterReport from './Components/Report/waiterReport';
import PosNewOrder from './Components/Pos/posNeworder';

import OnlineOrder from './Components/Pos/onlineOrder';
import OngoingOrder from './Components/Pos/ongoingOrder';
import SettlementReport from './Components/Pos/settlementReport';
import DeliverySession from './Components/Pos/deliverySession';
import EditIngredients from './Components/Ingredient/ingredients/editIngredients';
import EditFoodMenu from './Components/Foodmenu/editfoodmenu';
import { RequireToken } from './Components/routes/PrivateRoutes';



function App() {



  const isLoggedIn = window.localStorage.getItem("loggedIn");
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setLoggedIn(false);
  // };

  return (
    
  <BrowserRouter>
 
  <Suspense fallback={<Spinner />}>
    <Routes>
   
                 <Route path='/' element={<Login />} />

                 <Route path='/dashboard' element={
                  <RequireToken>
                    <Dashboard />
                  </RequireToken>
                  }></Route>

    
              <Route path="/dashboard" element={<Dashboard />}  />

              <Route path='/addingredientfoodcategory' element={<RequireToken><AddCategory/></RequireToken>}></Route>
              <Route path='/viewingredientfoodcategory' element={<RequireToken><ViewCategory /></RequireToken>}></Route>
              <Route path='/editingrdientfoodcategory/:id' element={<RequireToken><EditCategory /></RequireToken>}></Route>
          
              <Route path='/viewingredientunit' element={<RequireToken><ViewIngredientUnit /></RequireToken>}></Route>
              <Route path='/addingredientunit' element={<RequireToken><AddIngredientUnit /></RequireToken>}></Route>
              <Route path='/editingredientunit/:id' element={<RequireToken><EditIngredientUnit /></RequireToken>}></Route>
        
             
              <Route path='/viewingredients' element={<RequireToken><ViewIngredients /></RequireToken>}></Route>
              <Route path='/addingredients' element={<RequireToken><AddIngredients /></RequireToken>}></Route>
              <Route path='/editingredients/:id' element={<RequireToken><EditIngredients /></RequireToken>}></Route>
            
              <Route path='/addVat' element={<RequireToken><AddVat /></RequireToken>}></Route>
              <Route path='/viewVat' element={<RequireToken><ViewVat /></RequireToken>}></Route>
              <Route path='/editVat/:id' element={<RequireToken><EditVat /></RequireToken>}></Route>
          
              <Route path='/addTable' element={<RequireToken><AddTable /></RequireToken>}></Route>
              <Route path='/viewTable' element={<RequireToken><ViewTable /></RequireToken>}></Route>
              <Route path='/editTable/:id' element={<RequireToken><EditTable /></RequireToken>} ></Route>
            
              <Route path='/addfoodcategory' element={<RequireToken><AddFoodCategory /></RequireToken>}></Route>
              <Route path='/editfoodcategory/:id' element={<RequireToken><EditFoodCategory /></RequireToken>}></Route>
              <Route path='/viewfoodcategory' element={<RequireToken><ViewFoodCategory /></RequireToken>}></Route>
             
              <Route path='/addfoodmenu' element={<RequireToken><AddFoodMenu /></RequireToken>}></Route>
              <Route path='/viewfoodmenu' element={<RequireToken><ViewFoodMenu /></RequireToken>}></Route>
              <Route path='/editfoodmenu/:id' element={<RequireToken><EditFoodMenu /></RequireToken>}></Route>
            
              <Route path='/addWaiter' element={<RequireToken><AddWaiter /></RequireToken>}></Route>
              <Route path='/viewWaiter' element={<RequireToken><ViewWaiter /></RequireToken>}></Route>
              <Route path='/editWaiter/:id' element={<RequireToken><EditWaiter /></RequireToken>}></Route>
            
              <Route path='/pos' element={<RequireToken><Pos /></RequireToken>}></Route>
              <Route path='/runningorder' element={<RequireToken><OngoingOrder /></RequireToken>}></Route>
              <Route path='/onlineorder' element={<RequireToken><OnlineOrder /></RequireToken>}></Route>
              <Route path='/settlementreport' element={<RequireToken><SettlementReport /></RequireToken>}></Route>
              <Route path='/deliverysession' element={<RequireToken><DeliverySession /></RequireToken>}></Route>
        
              
              <Route path='/posorder' element={<RequireToken><ViewPosOrder /></RequireToken>}></Route>
              <Route path='/pos/neworder' element={<RequireToken><PosNewOrder /></RequireToken>}></Route>
              <Route path='/posorderdetails/:id' element={<RequireToken><ViewPosOrderdetails /></RequireToken>}></Route>
        
           
              <Route path='/viewCustomer' element={<RequireToken><ViewCustomer /></RequireToken>}></Route>
              <Route path='/addCustomer' element={<RequireToken><AddCustomer /></RequireToken>}></Route>
              <Route path='/editCustomer/:id' element={<RequireToken><EditCustomer /></RequireToken>}></Route>
        
             
              <Route path='/viewDelivery' element={<RequireToken><ViewDelivery /></RequireToken>}></Route>
              <Route path='/addDelivery' element={<RequireToken><AddDelivery /></RequireToken>}></Route>
        
             
        
              <Route path='/viewSupplier' element={<RequireToken><ViewSupplier /></RequireToken>}></Route>
              <Route path='/addSupplier' element={<RequireToken><AddSupplier /></RequireToken>}></Route>
        
             
              <Route path='/viewPurchase' element={<RequireToken><ViewPurchase /></RequireToken>}></Route>
              <Route path='/addPurchase' element={<RequireToken><AddPurchase /></RequireToken>}></Route>
              <Route path='/editPurchase/:id' element={<RequireToken><EditPurchase /></RequireToken>}></Route>
        
              {/* Reports */}
              <Route path='/dailveryReport' element={<RequireToken><DeliveryReport /></RequireToken>}></Route>
              <Route path='/customerReport' element={<RequireToken><CustomerReport /></RequireToken>}></Route>
              <Route path='/waiterReport' element={<RequireToken><WaiterReport /></RequireToken>}></Route>
            
          
   
  
 
     

     
   
    </Routes>
    </Suspense>
  
  </BrowserRouter>



  )
}

export default App
