import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContextAPI';

const Signin = () => {
  const { methodSignin } = useContext(UserContext);
  const navigate = useNavigate();

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const mobile = form.mobile.value;
    const password = form.password.value;

    // console.log(phoneNumber, password);
    if (mobile && password) {
      const signinData = {
        mobile: mobile,
        password: password,
      };
      methodSignin(signinData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const userData = res.data;
            // console.log(userData);
            window.localStorage.setItem('jwtToken', userData.token);
            navigate('/dashboard');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      {/* Signin Page Container */}
      <div className='wrapper'>
        {/* <!--start content--> */}
        <main className='authentication-content'>
          <div className='container-fluid'>
            <div className='authentication-card'>
              <div className='card shadow rounded-0 overflow-hidden'>
                <div className='row'>
                  <div className='col-lg-6 bg-login d-flex align-items-center justify-content-center'>
                    <img
                      src='assets/images/error/login-img.jpg'
                      className='img-fluid'
                      alt=''
                    />
                  </div>
                  <div className='col-lg-6'>
                    <div className='card-body p-4 p-sm-5'>
                      <h5 className='card-title'>Sign In</h5>
                      <p className='card-text'>
                        See your growth and get consulting support!
                      </p>
                      <form
                        className='form-body'
                        onSubmit={(e) => handlerOnSubmit(e)}
                      >
                        <div className='login-separater text-center mb-4'>
                          {' '}
                          <span>SIGN IN WITH PHONE NUMBER</span>
                          <hr />
                        </div>
                        <div className='row gap-2'>
                          <div className='col-12'>
                            <label
                              htmlFor='inputEmailAddress'
                              className='form-label'
                            >
                              Phone Number
                            </label>
                            <div className='ms-auto position-relative'>
                              <div className='position-absolute top-50 translate-middle-y search-icon px-3'>
                                <i className='fa-solid fa-phone'></i>
                              </div>
                              <input
                                type='number'
                                name='mobile'
                                className='form-control radius-30 ps-5'
                                id='inputEmailAddress'
                                placeholder='Phone Number'
                                required
                              />
                            </div>
                          </div>
                          <div className='col-12'>
                            <label
                              htmlFor='inputChoosePassword'
                              className='form-label'
                            >
                              Password
                            </label>
                            <div className='ms-auto position-relative'>
                              <div className='position-absolute top-50 translate-middle-y search-icon px-3'>
                                <i className='bi bi-lock-fill'></i>
                              </div>
                              <input
                                type='password'
                                name='password'
                                className='form-control radius-30 ps-5'
                                id='inputChoosePassword'
                                placeholder='Enter Password'
                                required
                              />
                            </div>
                          </div>
                          <div className='d-flex align-items-center justify-content-between my-2'>
                            <div className='form-check form-switch d-flex align-items-center'>
                              <input
                                className='form-check-input me-2'
                                type='checkbox'
                                // id='flexSwitchCheckChecked'
                                // checked=''
                              />
                              <label className='form-check-label'>
                                Remember Me
                              </label>
                            </div>
                            <div className='text-end'>
                              <Link to='/forget-password'>
                                Forgot Password ?
                              </Link>
                            </div>
                          </div>

                          <div className='col-12 text-center'>
                            <div className='d-grid'>
                              <button
                                type='submit'
                                className='btn btn-primary radius-30'
                              >
                                Sign In
                              </button>
                            </div>
                            <Link
                              className='text-underline-none text-white'
                              to='/'
                            >
                              <button className='btn btn-secondary btn-lg px-md-4 radius-30 text-white mt-3'>
                                Back to Home
                              </button>
                            </Link>
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

export default Signin;
