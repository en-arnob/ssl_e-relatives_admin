import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const handlerOnSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const userInfo = {
          mobile: state.mobile,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        };
        updatePassword(userInfo);
      } else {
        toast.error('Password Not Matched!!');
      }
    }
  };

  const updatePassword = async (userInfo) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/password`,
        userInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res);
      // const data = res.data;

      if (res.status === 200) {
        toast.success('Password Reset Successfully!!');
        navigate('/signin');
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
                      <h5 className='card-title'>Genrate New Password</h5>
                      <p className='card-text mb-5'>
                        We received your reset password request. Please enter
                        your new password!
                      </p>
                      <form
                        className='form-body'
                        onSubmit={(e) => handlerOnSubmit(e)}
                      >
                        <div className='row gap-3'>
                          <div className='col-12'>
                            <label
                              htmlFor='inputNewPassword'
                              className='form-label'
                            >
                              New Password
                            </label>
                            <div className='ms-auto position-relative'>
                              <div className='position-absolute top-50 translate-middle-y search-icon px-3'>
                                <i className='bi bi-lock-fill'></i>
                              </div>
                              <input
                                type='password'
                                name='newPassword'
                                className='form-control radius-30 ps-5'
                                id='inputNewPassword'
                                placeholder='Enter New Password'
                                required
                              />
                            </div>
                          </div>
                          <div className='col-12'>
                            <label
                              htmlFor='inputConfirmPassword'
                              className='form-label'
                            >
                              Confirm Password
                            </label>
                            <div className='ms-auto position-relative'>
                              <div className='position-absolute top-50 translate-middle-y search-icon px-3'>
                                <i className='bi bi-lock-fill'></i>
                              </div>
                              <input
                                type='password'
                                name='confirmPassword'
                                className='form-control radius-30 ps-5'
                                id='inputConfirmPassword'
                                placeholder='Confirm Password'
                                required
                              />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className='d-grid gap-3'>
                              <button
                                type='submit'
                                className='btn btn-primary radius-30'
                              >
                                Change Password
                              </button>
                              <Link
                                to='/signin'
                                className='btn btn-light radius-30'
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

export default ResetPasswordPage;
