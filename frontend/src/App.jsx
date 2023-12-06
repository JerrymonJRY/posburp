
import React, { Suspense, lazy,useState  } from 'react';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

import { AuthProvider } from './Components/userPages/Auth';
import PrivateRoute from './PrivateRoutes';
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



function App() {
  const [count, setCount] = useState(0)

  return (
    
  <BrowserRouter>
  <AuthProvider>
  <Suspense fallback={<Spinner />}>
    <Routes>
   
      <Route path='/' element={<Dashboard />} ></Route>
      {/* <Route path="/logout" element={<Logout />}></Route> */}
      {/* <Route path='/' element={<Dashboard />} ></Route> */}
      <Route
        path="/dashboard"
         element={<Dashboard />}
      />
      {/* Food Ingredient Category */}
      <Route path='/addingredientfoodcategory' element={<AddCategory/>}></Route>
      <Route path='/viewingredientfoodcategory' element={<ViewCategory />}></Route>
      <Route path='/editingrdientfoodcategory/:id' element={<EditCategory />}></Route>
      {/* Food Ingredient Unit */}
      <Route path='/viewingredientunit' element={<ViewIngredientUnit />}></Route>
      <Route path='/addingredientunit' element={<AddIngredientUnit />}></Route>
      <Route path='/editingredientunit/:id' element={<EditIngredientUnit />}></Route>

      {/* Food Ingredients */}
      <Route path='/viewingredients' element={<ViewIngredients />}></Route>
      <Route path='/addingredients' element={<AddIngredients />}></Route>
      {/* Food Vat */}
      <Route path='/addVat' element={<AddVat />}></Route>
      <Route path='/viewVat' element={<ViewVat />}></Route>
      <Route path='/editVat/:id' element={<EditVat />}></Route>
      {/* Table */}
      <Route path='/addTable' element={<AddTable />}></Route>
      <Route path='/viewTable' element={<ViewTable />}></Route>
      <Route path='/editTable/:id' element={<EditTable />} ></Route>
      {/* Food Category */}
      <Route path='/addfoodcategory' element={<AddFoodCategory />}></Route>
      <Route path='/editfoodcategory/:id' element={<EditFoodCategory />}></Route>
      <Route path='/viewfoodcategory' element={<ViewFoodCategory />}></Route>
      {/* food Menu */}
      <Route path='/addfoodmenu' element={<AddFoodMenu />}></Route>
      <Route path='/viewfoodmenu' element={<ViewFoodMenu />}></Route>
      {/* Waiter */}
      <Route path='/addWaiter' element={<AddWaiter />}></Route>
      <Route path='/viewWaiter' element={<ViewWaiter />}></Route>
      <Route path='/editWaiter/:id' element={<EditWaiter />}></Route>
      {/* Pos */}
      <Route path='/pos' element={<Pos />}></Route>
      <Route path='/runningorder' element={<OngoingOrder />}></Route>
      <Route path='/onlineorder' element={<OnlineOrder />}></Route>
      <Route path='/settlementreport' element={<SettlementReport />}></Route>
      <Route path='/deliverysession' element={<DeliverySession />}></Route>

      
      <Route path='/posorder' element={<ViewPosOrder />}></Route>
      <Route path='/pos/neworder' element={<PosNewOrder />}></Route>
      <Route path='/posorderdetails/:id' element={<ViewPosOrderdetails />}></Route>

      {/* Customer  */}
      <Route path='/viewCustomer' element={<ViewCustomer />}></Route>
      <Route path='/addCustomer' element={<AddCustomer />}></Route>
      <Route path='/editCustomer/:id' element={<EditCustomer />}></Route>

      {/* Delivery */}
      <Route path='/viewDelivery' element={<ViewDelivery />}></Route>
      <Route path='/addDelivery' element={<AddDelivery />}></Route>

      {/* Supplier */}

      <Route path='/viewSupplier' element={<ViewSupplier />}></Route>
      <Route path='/addSupplier' element={<AddSupplier />}></Route>

      {/* Purchase */}
      <Route path='/viewPurchase' element={<ViewPurchase />}></Route>
      <Route path='/addPurchase' element={<AddPurchase />}></Route>
      <Route path='/editPurchase/:id' element={<EditPurchase />}></Route>

      {/* Reports */}
      <Route path='/dailveryReport' element={<DeliveryReport />}></Route>
      <Route path='/customerReport' element={<CustomerReport />}></Route>
      <Route path='/waiterReport' element={<WaiterReport />}></Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
   
    </Routes>
    </Suspense>
    </AuthProvider>
  </BrowserRouter>



  )
}

export default App
