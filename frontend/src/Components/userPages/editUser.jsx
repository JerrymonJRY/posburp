import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
const EditUser =() =>{

    const {id} =useParams()
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstname,setFirstName] =useState('');
  const [lastname,setLastName] =useState('');
  const [email,setEmail] =useState('');
  const [mobile,setMobile] =useState('');
  const [userrole,setUserRole] =useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [otherAllowance, setOtherAllowance] = useState('');
  const [netSalary, setNetSalary] = useState('');
  const [joiningdate, setJoiningdate] = useState('');
  const [contactperson, setContactperson] = useState('');
  const [contactnumber, setContactnumber] = useState('');
  const [address, setAddress] = useState('');


  const navigate = useNavigate();

  const UserRoles  = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Cashier', label: 'Cashier' },
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Waiter', label: 'Waiter' },
    { value: 'Cleaners', label: 'Cleaners' },
    { value: 'Chef', label: 'Chef' },
    { value: 'Security', label: 'Security' },
    { value: 'Valet Driver', label: 'Valet Driver' },

  ];

  const handleUserRole = (event) => {
    setUserRole(event.target.value);
  //  alert({svat});
   }

   const handleBasicSalaryChange = (event) => {
    const value = event.target.value;
    setBasicSalary(value);
    calculateNetSalary(value, otherAllowance);
  };

  // Function to handle changes in other allowance input
  const handleOtherAllowanceChange = (event) => {
    const value = event.target.value;
    setOtherAllowance(value);
    calculateNetSalary(basicSalary, value);
  };

  // Function to calculate net salary
  const calculateNetSalary = (basic, allowance) => {
    const basicValue = parseFloat(basic);
    const allowanceValue = parseFloat(allowance);
    const total = basicValue + allowanceValue || basicValue;
    setNetSalary(total.toFixed(2));
  };


   useEffect( ()=>{

    axios.get(`${apiConfig.baseURL}/api/user/edituser/${id}`)
    .then(res => { console.log(res)
      setFirstName(res.data.firstname)
      setLastName(res.data.lastname)
      setEmail(res.data.email)
      setMobile(res.data.mobile)
      setUserRole(res.data.userrole)
      setBasicSalary(res.data.basicSalary)
      setOtherAllowance(res.data.otherAllowance)
      setNetSalary(res.data.netSalary)
      setJoiningdate(res.data.joiningdate)
      setContactperson(res.data.contactperson)
      setContactnumber(res.data.contactnumber)
      setAddress(res.data.address)

})
    .catch(err =>console.log(err));

},[])

   const handleSubmit =(event) =>{

    event.preventDefault();

    var formData = new FormData();

    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("userrole", userrole);

    formData.append("joiningdate", joiningdate);
    formData.append("basicSalary", basicSalary);
    formData.append("otherAllowance", otherAllowance);
    formData.append("netSalary", netSalary);
    formData.append("contactperson", contactperson);

    formData.append("contactnumber", contactnumber);
    formData.append("address", address);


    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // console.log("basicSalary:", basicSalary);

    axios
    .put(
      `${apiConfig.baseURL}/api/user/updateuser/${id}`,
      formData,
      config
    )

    .then((res) => {
      console.log(res);
      navigate("/viewuser");
    })
    .catch((err) => console.log(err));

   }


    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Edit User </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">User</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Edit User</li>
                </ol>
              </nav>
            </div>
            <div className="row">

              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">

                    <form className="forms-sample" onSubmit={handleSubmit} >
                        <div className="row">

                            <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">First Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="firstname" value={firstname} onChange={(e)=>setFirstName(e.target.value)} id="exampleInputUsername2" placeholder="" />

                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="lastname" value={lastname} onChange={(e)=>setLastName(e.target.value)} id="exampleInputUsername2"  placeholder="" />

                        </div>
                      </div>


                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="exampleInputUsername2"  placeholder="" />

                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Mobile</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)} id="exampleInputUsername2"  placeholder="" />

                        </div>
                      </div>






<div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">User Roles</label>
                        <div className="col-sm-9">
                        <select name="beverage" className="form-control"     value={userrole}>
                        <option value="">Select User Role</option>
      {UserRoles.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

                        </div>
                      </div>



<div className='form-group row'>
    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Joining Date</label>
    <div className='col-sm-9'>
        <input type='date' className='form-control'  value={joiningdate} onChange={(e)=>setJoiningdate(e.target.value)}  name='joiningdate' />
    </div>
</div>


<div className='form-group row'>
        <label htmlFor="basicSalary" className="col-sm-3 col-form-label">Basic Salary</label>
        <div className='col-sm-9'>
          <input
            id="basicSalary"
            type='text'
            className='form-control'
            value={basicSalary}
            name='basicSalary'
            onChange={handleBasicSalaryChange}
          />
        </div>
      </div>

      <div className='form-group row'>
        <label htmlFor="otherAllowance" className="col-sm-3 col-form-label">Other Allowance</label>
        <div className='col-sm-9'>
          <input
            id="otherAllowance"
            type='text'
            className='form-control'
            value={otherAllowance}
            name='otherAllowance'
            onChange={handleOtherAllowanceChange}
          />
        </div>
      </div>

      <div className='form-group row'>
        <label htmlFor="netSalary" className="col-sm-3 col-form-label">Net Salary</label>
        <div className='col-sm-9'>
          <input
            id="netSalary"
            type='text'
            className='form-control'
            value={netSalary}
            name='netSalary'
            readOnly
          />
        </div>
      </div>



      <div className='form-group row'>
    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Emergency Contact Person Name</label>
    <div className='col-sm-9'>
        <input type='text' className='form-control' value={contactperson} onChange={(e)=>setContactperson(e.target.value)} name='contactperson' />
    </div>
</div>

<div className='form-group row'>
    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Emergency Contact Number</label>
    <div className='col-sm-9'>
        <input type='text' className='form-control' value={contactnumber} onChange={(e)=>setContactnumber(e.target.value)}  name='contactnumber' />
    </div>
</div>

<div className='form-group row'>
    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Address</label>
    <div className='col-sm-9'>
        <input type='text' className='form-control' value={address} onChange={(e)=>setAddress(e.target.value)}  name='address' />
    </div>
</div>





                        </div>

                      <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>

                    </form>
                  </div>
                </div>
              </div>




            </div>
          </div>
                    <Footer />
            </div>
        </div>
    </div>
    )
}

export default EditUser;