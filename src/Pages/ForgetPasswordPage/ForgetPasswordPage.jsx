import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContextAPI';

const ForgetPasswordPage = () => {
  const { smsAPI } = useContext(UserContext);
  const navigate = useNavigate();

  const handlerOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const form = e.target;
      const mobile = form.mobile.value;

      const mobileNumber = {
        mobile: mobile,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/verify-phonenumber`,
        mobileNumber,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = res.data;

      if (res.status === 200) {
        const userData = {
          id: data?.data?.id,
          mobile: data?.data?.mobile,
        };
        methodOtpVerification(userData);
        // navigate('/reset-password', { state: info });
        // console.log(data);
      }
    } catch (error) {
      console.error(error);
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const methodOtpVerification = async (userData) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/otp-generate`
      );
      console.log(res);
      if (res.status === 200) {
        const otpData = {
          userData: userData,
          otp: res?.data?.data,
        };
        // console.log(otpData);
        const mobileNumber = userData?.mobile;
        // const customerName = `${record?.user?.f_name} ${record?.user?.l_name}`;
        const otp = res?.data?.data;
        const paymentMessage = `Your Password Reset verification code is ${otp}.`;

        smsAPI(mobileNumber, paymentMessage)
          .then((res) => {
            console.log(res);
            toast.success(`Otp Verification Code Sent to ${mobileNumber}`);
            navigate('/otp-verification', { state: otpData });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.error(error);
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {/* ResetPassword Container */}
      <div className='wrapper'>
        {/* <!--start content--> */}
        <main className='authentication-content'>
          <div className='container-fluid'>
            <div className='authentication-card'>
              <div className='card shadow rounded-0 overflow-hidden'>
                <div className='row g-0'>
                  <div className='col-lg-6 d-flex align-items-center justify-content-center border-end'>
                    <img
                      src='assets/images/error/forgot-password-frent-img.jpg'
                      className='img-fluid'
                      alt=''
                    />
                  </div>
                  <div className='col-lg-6'>
                    <div className='card-body p-4 p-sm-5'>
                      <h5 className='card-title'>Forgot Password?</h5>
                      <p className='card-text mb-5'>
                        Enter your registered Phone Number to reset the password
                      </p>
                      <form
                        className='form-body'
                        onSubmit={(e) => handlerOnSubmit(e)}
                      >
                        <div className='row gap-3'>
                          <div className='col-12'>
                            <label
                              htmlFor='inputEmailid'
                              className='form-label'
                            >
                              Phone Number
                            </label>
                            <input
                              type='number'
                              name='mobile'
                              className='form-control form-control-lg radius-30'
                              id='inputEmailid'
                              placeholder='Phone Number'
                              required
                            />
                          </div>
                          <div className='col-12'>
                            <div className='d-grid gap-3'>
                              <button
                                type='submit'
                                className='btn btn-lg btn-primary radius-30'
                              >
                                Submit
                              </button>
                              <Link
                                to='/signin'
                                className='btn btn-lg btn-light radius-30'
                              >
                                Back to Login
                              </Link>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ForgetPasswordPage;
