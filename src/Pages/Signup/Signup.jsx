import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContextAPI';

const Signup = () => {
  const navigate = useNavigate();
  const { smsAPI } = useContext(UserContext);

  const handlerOnSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const f_name = form.firstName.value;
    const l_name = form.lastName.value;
    const mobile = form.mobile.value;
    const address = form.address.value;
    const password = form.password.value;
    const re_password = form.re_password.value;

    if (password && re_password) {
      if (password === re_password) {
        const patientData = {
          f_name: f_name,
          l_name: l_name,
          mobile: mobile,
          address1: address,
          password: password,
        };
        methodCreatePatient(patientData, form);
      } else {
        toast.error('Password Not Matched!!');
      }
    }
  };

  const methodCreatePatient = async (patientData, form) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/user/signup`,
      patientData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // console.log(res?.data?.data?.mobile);
    const mobileNumber = res?.data?.data?.mobile;
    const customerName = `${res?.data?.data?.f_name} ${res?.data?.data?.l_name}`;
    const regNo = res?.data?.data?.registration_no;
    const message = `Dear ${customerName}, Your Registration has been Completed Successfully for Eureka Diagnostic And Medical Center(EDMC). Your registration ID is: ${regNo}. Please Contact our Office to complete the process. Thank You!`;
    if (res.status === 201) {
      smsAPI(mobileNumber, message)
        .then((res) => {
          console.log(res);
          toast.success(`User Created successfully!!`);
          form.reset();
          navigate('/signin');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error('User Already Created Using This Mobile Number!!');
    }
  };

  return (
    <>
      <div className='page-content mx-auto'>
        <div className='w-50 mx-auto d-flex align-items-center justify'>
          <div className='card shadow rounded-0 overflow-hidden '>
            <div className='row gap-0'>
              <div className='col-lg-4 bg-login '>
                <img
                  src='assets/images/error/login-img.jpg'
                  className='img-fluid'
                  alt=''
                />
              </div>
              <div className='col-lg-8'>
                <div className='card-body p-4'>
                  <h5 className='card-title'>Sign Up</h5>
                  <p className='card-text'>
                    See your growth and get consulting support!
                  </p>
                  <form
                    className='form-body'
                    onSubmit={(e) => handlerOnSubmit(e)}
                  >
                    <div className='login-separater text-center mb-4'>
                      {' '}
                      <span>SIGN UP WITH MOBILE NUMBER</span>
                      <hr />
                    </div>
                    <div className='row gap-2'>
                      <div className='col-12 '>
                        <label htmlFor='inputName' className='form-label'>
                          First Name <span className='text-danger'>*</span>
                        </label>
                        <div className='ms-auto position-relative'>
                          <div className='position-absolute top-50 translate-middle-y search-icon px-3'>
                            <i className='bi bi-person-circle' />
                          </div>
                          <input
                            type='text'
                            name='firstName'
                            className='form-control radius-30 ps-5'
                            id='inputName'
                            placeholder='Enter First Name'
                          />
                        </div>
                      </div>
                      <div className='col-12 '>
                        <label htmlFor='inputName' className='form-label'>
                          Last Name
                        </label>
                        <div className='ms-auto position-relative'>
                          <div className='position-absolute top-50 translate-middle-y search-icon px-3'>
                            <i className='bi bi-person-circle' />
                          </div>
                          <input
                            type='text'
                            name='lastName'
                            className='form-control radius-30 ps-5'
                            id='inputName'
                            placeholder='Enter Last Name'
                          />
                        </div>
                      </div>
                      <div className='col-12'>
                        <label
                          htmlFor='inputEmailAddress'
                          className='form-label'
                        >
                          Mobile Number <span className='text-danger'>*</span>
                        </label>
                        <div className='ms-auto position-relative'>
                          <div className='position-absolute top-50 translate-middle-y search-icon px-3'>
                            <i className='fa-solid fa-phone'></i>
                          </div>
                          <input
                            type='tel'
                            name='mobile'
                            className='form-control radius-30 ps-5'
                            id='inputEmailAddress'
                            placeholder='Mobile Number'
                          />
                        </div>
                      </div>
                      <div className='col-12'>
                        <label
                          htmlFor='inputEmailAddress'
                          className='form-label'
                        >
                          Address
                        </label>
                        <div className='ms-auto position-relative'>
                          <div className='position-absolute top-50 translate-middle-y search-icon px-3'></div>
                          <textarea
                            name='address'
                            className='form-control w-100 rounded'
                            rows='3'
                            maxLength='200'
                            placeholder='Home Address'
                          ></textarea>
                        </div>
                      </div>
                      <div className='col-12'>
                        <label
                          htmlFor='inputChoosePassword'
                          className='form-label'
                        >
                          Password <span className='text-danger'>*</span>
                        </label>
                        <div className='ms-auto position-relative'>
                          <div className='position-absolute top-50 translate-middle-y search-icon px-3'>
                            <i className='bi bi-lock-fill' />
                          </div>
                          <input
                            type='password'
                            name='password'
                            className='form-control radius-30 ps-5'
                            id='inputChoosePassword'
                            placeholder='Enter Password'
                          />
                        </div>
                      </div>
                      <div className='col-12'>
                        <label
                          htmlFor='inputChoosePassword'
                          className='form-label'
                        >
                          Re-enter Password{' '}
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='ms-auto position-relative'>
                          <div className='position-absolute top-50 translate-middle-y search-icon px-3'>
                            <i className='bi bi-lock-fill' />
                          </div>
                          <input
                            type='password'
                            name='re_password'
                            className='form-control radius-30 ps-5'
                            id='inputChoosePassword'
                            placeholder='Re-Enter Password'
                          />
                        </div>
                      </div>
                      <div className='col-12'>
                        <div className='form-check form-switch d-flex align-items-center gap-2 justify-content-center'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='flexSwitchCheckChecked'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='flexSwitchCheckChecked'
                          >
                            I Agree to the Trems &amp; Conditions
                          </label>
                        </div>
                      </div>
                      <div className='col-12'>
                        <div className='d-grid'>
                          <button
                            type='submit'
                            className='btn btn-primary radius-30'
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-center'>
                        <p className='mb-0'>
                          Already have an account?{' '}
                          <Link to='/signin'> Signin</Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
