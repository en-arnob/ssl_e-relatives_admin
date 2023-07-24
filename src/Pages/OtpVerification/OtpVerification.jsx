import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userData } = state;
  const { mobile } = state?.userData;
  const { otp } = state;
  // console.log(state?.otpData);
  // console.log(otp);

  const handlerOnSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const otpCode = parseInt(form.otp.value);

    if (otpCode === otp) {
      navigate('/reset-password', { state: userData });
    } else {
      toast.error("Authentication Error!!...OTP doesn't match");
    }
  };
  return (
    <>
      {/* Oto Verification Page Container */}
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
                      <h5 className='card-title'>Verify Your Phone Number</h5>
                      <p className='card-text mb-5'>
                        Enter the verification code we sent to your mobile{' '}
                        {mobile}
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
                              Verification Code
                            </label>
                            <input
                              type='number'
                              name='otp'
                              minLength={'6'}
                              className='form-control form-control-lg radius-30'
                              id='inputEmailid'
                              placeholder='Enter 6 digit code'
                            />
                          </div>
                          <div className='col-12'>
                            <div className='d-grid gap-3'>
                              <button
                                type='submit'
                                className='btn btn-lg btn-primary radius-30'
                              >
                                Verify
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

export default OtpVerification;
