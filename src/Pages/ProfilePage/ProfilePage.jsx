import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContextAPI';

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);

  let userRecords = currentUser;

  const location = useLocation();

  if (location?.state?.record) {
    userRecords = location?.state?.record;
  }

  // console.log(location);
  // console.log(currentUser);

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <div className='border p-3 rounded'>
            <div className='card-box'>
              <h6 className='mb-0 text-uppercase'>Users Profile</h6>
              <div className='col'>
                {/* Create User trigger modal Button */}
              </div>
            </div>

            <hr />

            <div className='row'>
              <div className='col-12 col-lg-4'>
                <div className='card shadow-sm border-0 overflow-hidden'>
                  <div className='card-body'>
                    <div className='profile-avatar text-center'>
                      {!userRecords || !userRecords?.image ? (
                        <img
                          src='/userimg.png'
                          className='rounded-circle shadow'
                          width={120}
                          height={120}
                          alt=''
                        />
                      ) : (
                        <img
                          src={`${process.env.REACT_APP_UPLOAD_URL}/users/${userRecords?.image}`}
                          className='rounded-circle shadow'
                          width={120}
                          height={120}
                          alt=''
                        />
                      )}
                    </div>
                    {/* <div className='d-flex align-items-center justify-content-around mt-5 gap-3'>
                      <div className='text-center'>
                        <h4 className='mb-0'>45</h4>
                        <p className='mb-0 text-secondary'>Friends</p>
                      </div>
                      <div className='text-center'>
                        <h4 className='mb-0'>15</h4>
                        <p className='mb-0 text-secondary'>Photos</p>
                      </div>
                      <div className='text-center'>
                        <h4 className='mb-0'>86</h4>
                        <p className='mb-0 text-secondary'>Comments</p>
                      </div>
                    </div> */}
                    <div className='text-center mt-4'>
                      <h6 className='mb-1'>
                        Reg No. {userRecords?.registration_no}
                      </h6>
                      <h4 className='mb-1'>
                        {userRecords?.f_name} {userRecords?.l_name}
                      </h4>
                      <h6 className='mb-1'>Email: {userRecords?.email}</h6>
                      <h6 className='mb-3'>Mobile: {userRecords?.mobile}</h6>
                      <h6 className='mb-3'>
                        Date Of Birth: {userRecords?.date_of_birth}
                      </h6>
                      <p className='mb-0 text-secondary'>
                        {userRecords?.address_1}
                      </p>
                      <p className='mb-0 text-secondary'>
                        {userRecords?.address_2}
                      </p>
                      <div className='mt-4' />
                      <h6 className='mb-1'>
                        {userRecords?.role?.name} - Codervent Technology
                      </h6>
                      <p className='mb-0 text-secondary'>
                        University of Information Technology
                      </p>
                    </div>
                    <ul className='list-group list-group-flush mt-4'>
                      <li className='list-group-item d-flex justify-content-between align-items-center bg-transparent border-top'>
                        Contact Person
                        <span className='badge bg-light text-dark'>
                          {userRecords?.contact_person}
                        </span>
                      </li>
                      <li className='list-group-item d-flex justify-content-between align-items-center bg-transparent border-top'>
                        NID
                        <span className='badge bg-light text-dark'>
                          {userRecords?.nid}
                        </span>
                      </li>
                      <li className='list-group-item d-flex justify-content-between align-items-center bg-transparent border-top'>
                        Status
                        <span className='badge bg-primary rounded-pill'>
                          {userRecords?.status}
                        </span>
                      </li>
                      <li className='list-group-item d-flex justify-content-between align-items-center bg-transparent'>
                        Credit Limit
                        <span className='badge bg-primary rounded-pill'>
                          BDT {`${userRecords?.credit_limit === undefined ? 0 : userRecords?.credit_limit}`}
                        </span>
                      </li>
                      <li className='list-group-item d-flex justify-content-between align-items-center bg-transparent'>
                        Commission Rate
                        <span className='badge bg-primary rounded-pill'>
                          {userRecords?.commission_rate}%
                        </span>
                      </li>
                      <li className='list-group-item d-flex justify-content-between align-items-center bg-transparent'>
                        Wallet
                        <span className='badge bg-primary rounded-pill'>
                          {userRecords?.wallet}
                        </span>
                      </li>
                    </ul>
                    <hr />

                    <div className='text-start'>
                      <h5 className=''>Remarks</h5>
                      <p className='mb-0'>{userRecords?.remarks}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*overlay Toggle Icon*/}
      <div className='overlay nav-toggle-icon' />

      {/*Back To Top Button*/}
      <div className='' onClick={() => window.scrollTo(0, 0)}>
        <i className='bx bxs-up-arrow-alt back-to-top' />
      </div>

      {/*start switcher*/}
      <div className='switcher-body'>
        <button
          className='btn btn-primary btn-switcher shadow-sm'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasScrolling'
          aria-controls='offcanvasScrolling'
        >
          <i className='bi bi-paint-bucket me-0' />
        </button>
        <div
          className='offcanvas offcanvas-end shadow border-start-0 p-2'
          data-bs-scroll='true'
          data-bs-backdrop='false'
          tabIndex={-1}
          id='offcanvasScrolling'
        >
          <div className='offcanvas-header border-bottom'>
            <h5 className='offcanvas-title' id='offcanvasScrollingLabel'>
              Theme Customizer
            </h5>
            <button
              type='button'
              className='btn-close text-reset'
              data-bs-dismiss='offcanvas'
            />
          </div>
          <div className='offcanvas-body'>
            <h6 className='mb-0'>Theme Variation</h6>
            <hr />
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='inlineRadioOptions'
                id='LightTheme'
                defaultValue='option1'
                defaultChecked=''
              />
              <label className='form-check-label' htmlFor='LightTheme'>
                Light
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='inlineRadioOptions'
                id='DarkTheme'
                defaultValue='option2'
              />
              <label className='form-check-label' htmlFor='DarkTheme'>
                Dark
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='inlineRadioOptions'
                id='SemiDarkTheme'
                defaultValue='option3'
              />
              <label className='form-check-label' htmlFor='SemiDarkTheme'>
                Semi Dark
              </label>
            </div>
            <hr />
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='inlineRadioOptions'
                id='MinimalTheme'
                defaultValue='option3'
              />
              <label className='form-check-label' htmlFor='MinimalTheme'>
                Minimal Theme
              </label>
            </div>
            <hr />
            <h6 className='mb-0'>Header Colors</h6>
            <hr />
            <div className='header-colors-indigators'>
              <div className='row row-cols-auto g-3'>
                <div className='col'>
                  <div className='indigator headercolor1' id='headercolor1' />
                </div>
                <div className='col'>
                  <div className='indigator headercolor2' id='headercolor2' />
                </div>
                <div className='col'>
                  <div className='indigator headercolor3' id='headercolor3' />
                </div>
                <div className='col'>
                  <div className='indigator headercolor4' id='headercolor4' />
                </div>
                <div className='col'>
                  <div className='indigator headercolor5' id='headercolor5' />
                </div>
                <div className='col'>
                  <div className='indigator headercolor6' id='headercolor6' />
                </div>
                <div className='col'>
                  <div className='indigator headercolor7' id='headercolor7' />
                </div>
                <div className='col'>
                  <div className='indigator headercolor8' id='headercolor8' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
