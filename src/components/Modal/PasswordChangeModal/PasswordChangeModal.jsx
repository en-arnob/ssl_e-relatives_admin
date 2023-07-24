import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';

const PasswordChangeModal = (props) => {
  const { user } = props;

  // console.log(id);
  // console.log(user);

  const handlerOnSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const userInfo = {
          mobile: user?.mobile,
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
        toast.success('Password Change Successfully!!');
      }
    } catch (error) {
      console.error(error);
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div
        className='modal fade'
        id={`changePasswordModal`}
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Change Password</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='card-body '>
                <form
                  className='form-body'
                  onSubmit={(e) => handlerOnSubmit(e)}
                >
                  <div className='row gap-3'>
                    <div className='col-12'>
                      <label htmlFor='inputNewPassword' className='form-label'>
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
                          data-bs-dismiss='modal'
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordChangeModal;
