import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContextAPI';
import './Navbar.scss';

const Navbar = () => {
  const { currentUser, accessPerm } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(currentUser);

  const handlerOnSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const userInfo = {
          mobile: currentUser?.mobile,
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
      <header className='top-header'>
        <nav className='navbar navbar-expand'>
          <div className='mobile-toggle-icon d-xl-none'>
            <i className='bi bi-list' />
          </div>
          <div className='top-navbar d-none d-xl-block'>
            <ul className='navbar-nav align-items-center'>
              <li className='nav-item'>
                <Link className='nav-link' to='/dashboard'>
                  Dashboard
                </Link>
              </li>
              {/* <li className='nav-item'>
                <a className='nav-link' href='/dashboard/mail'>
                  Email
                </a>
              </li>
              <li className='nav-item'></li>
              <li className='nav-item d-none d-xxl-block'>
                <a className='nav-link' href='/dashboard/reports'>
                  Reports
                </a>
              </li>
              <li className='nav-item d-none d-xxl-block'>
                <a className='nav-link' href='/dashboard/projects'>
                  Projects
                </a>
              </li> */}
            </ul>
          </div>
          <div className='search-toggle-icon d-xl-none ms-auto'>
            <i className='bi bi-search' />
          </div>
          <form className='searchbar d-none d-xl-flex ms-auto'>
            <div className='position-absolute top-50 translate-middle-y search-icon ms-3'>
              <i className='bi bi-search' />
            </div>
            <input
              className='form-control'
              type='text'
              placeholder='Search by Mobile/Invoice/Registration No'
            />
            <div className='position-absolute top-50 translate-middle-y d-block d-xl-none search-close-icon'>
              <i className='bi bi-x-lg' />
            </div>
          </form>
          <div className='top-navbar-right ms-3'>
            <ul className='navbar-nav align-items-center'>
              <li className='nav-item dropdown dropdown-large'>
                <a
                  className='nav-link dropdown-toggle dropdown-toggle-nocaret'
                  href='/'
                  data-bs-toggle='dropdown'
                >
                  <div className='user-setting d-flex align-items-center gap-1'>
                    {!currentUser || !currentUser?.image ? (
                      <img
                        className='user-img'
                        src='/userimg.png'
                        alt='Profile Pic'
                      />
                    ) : (
                      <img
                        className='user-img'
                        src={`${process.env.REACT_APP_UPLOAD_URL}/users/${currentUser?.image}`}
                        alt='Profile Pic'
                      />
                    )}

                    {currentUser?.f_name && currentUser?.l_name && (
                      <div className='user-name d-none d-sm-block'>
                        {currentUser?.f_name} {currentUser?.l_name}
                      </div>
                    )}
                  </div>
                </a>
                <ul className='dropdown-menu dropdown-menu-end'>
                  <li>
                    <Link className='dropdown-item' to='/dashboard/profile'>
                      <div className='d-flex align-items-center'>
                        {!currentUser || !currentUser?.image ? (
                          <img
                            src='/userimg.png'
                            alt=''
                            className='rounded-circle'
                            width={60}
                            height={60}
                          />
                        ) : (
                          <img
                            src={`${process.env.REACT_APP_UPLOAD_URL}/users/${currentUser?.image}`}
                            alt=''
                            className='rounded-circle'
                            width={60}
                            height={60}
                          />
                        )}

                        <div className='ms-3'>
                          <h6 className='mb-0 dropdown-user-name'>
                            {currentUser?.f_name} {currentUser?.l_name}
                          </h6>
                          <small className='mb-0 dropdown-user-designation text-secondary'>
                            {currentUser?.role?.name}
                          </small>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>

                  <li>
                    {/* Change Password Triggered Modal Button */}
                    <button
                      type='button'
                      className='dropdown-item'
                      data-bs-toggle='modal'
                      data-bs-target='#changeLoginUserPassword'
                    >
                      <div className='d-flex align-items-center'>
                        <div className='setting-icon'>
                          <i className='bi bi-gear-fill' />
                        </div>
                        <div className='setting-text ms-3'>
                          <span>Change Password</span>
                        </div>
                      </div>
                    </button>
                  </li>

                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <button
                      className='dropdown-item'
                      onClick={() => {
                        localStorage.removeItem('jwtToken');
                        navigate('/signin');
                      }}
                    >
                      <div className='d-flex align-items-center'>
                        <div className='setting-icon'>
                          <i className='bi bi-lock-fill' />
                        </div>
                        <div className='setting-text ms-3'>
                          <span>Logout</span>
                        </div>
                      </div>
                    </button>
                  </li>
                </ul>
              </li>
              <li className='nav-item dropdown dropdown-large'>
                <a
                  className='nav-link dropdown-toggle dropdown-toggle-nocaret'
                  href='#'
                  data-bs-toggle='dropdown'
                >
                  <div className='projects'>
                    <i className='bi bi-grid-3x3-gap-fill' />
                  </div>
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  <div className='row row-cols-3 gx-2'>
                    {accessPerm(5, 4) && (
                      <div className='col'>
                        <Link to='/dashboard/users'>
                          <div className='apps p-2 radius-10 text-center'>
                            <div className='apps-icon-box mb-1 text-white bg-danger bg-gradient'>
                              <i className='bi bi-people-fill' />
                            </div>
                            <p className='mb-0 apps-name'>Users</p>
                          </div>
                        </Link>
                      </div>
                    )}

                    <div className='col'>
                      <Link to='/dashboard/profile'>
                        <div className='apps p-2 radius-10 text-center'>
                          <div className='apps-icon-box mb-1 text-white bg-purple bg-gradient'>
                            <i className='bi bi-person-circle' />
                          </div>
                          <p className='mb-0 apps-name'>Account</p>
                        </div>
                      </Link>
                    </div>
                    {/* <div className='col'>
                      <a href='#'>
                        <div className='apps p-2 radius-10 text-center'>
                          <div className='apps-icon-box mb-1 text-dark bg-info bg-gradient'>
                            <i className='bi bi-file-earmark-text-fill' />
                          </div>
                          <p className='mb-0 apps-name'>Docs</p>
                        </div>
                      </a>
                    </div>
                    <div className='col'>
                      <a href='ecommerce-orders.html'>
                        <div className='apps p-2 radius-10 text-center'>
                          <div className='apps-icon-box mb-1 text-white bg-primary bg-gradient'>
                            <i className='bi bi-cart-plus-fill' />
                          </div>
                          <p className='mb-0 apps-name'>Orders</p>
                        </div>
                      </a>
                    </div>
                       <div className='col'>
                      <a href='ecommerce-products-grid.html'>
                        <div className='apps p-2 radius-10 text-center'>
                          <div className='apps-icon-box mb-1 text-white bg-success bg-gradient'>
                            <i className='bi bi-bank2' />
                          </div>
                          <p className='mb-0 apps-name'>Products</p>
                        </div>
                      </a>
                    </div>
                    <div className='col'>
                      <a href='component-media-object.html'>
                        <div className='apps p-2 radius-10 text-center'>
                          <div className='apps-icon-box mb-1 text-white bg-orange bg-gradient'>
                            <i className='bi bi-collection-play-fill' />
                          </div>
                          <p className='mb-0 apps-name'>Media</p>
                        </div>
                      </a>
                    </div>
                    <div className='col'>
                      <a href='ecommerce-orders-detail.html'>
                        <div className='apps p-2 radius-10 text-center'>
                          <div className='apps-icon-box mb-1 text-white bg-pink bg-gradient'>
                            <i className='bi bi-credit-card-fill' />
                          </div>
                          <p className='mb-0 apps-name'>Payment</p>
                        </div>
                      </a>
                    </div>
                    <div className='col'>
                      <a href='#'>
                        <div className='apps p-2 radius-10 text-center'>
                          <div className='apps-icon-box mb-1 text-white bg-bronze bg-gradient'>
                            <i className='bi bi-calendar-check-fill' />
                          </div>
                          <p className='mb-0 apps-name'>Events</p>
                        </div>
                      </a>
                    </div>
                    <div className='col'>
                      <a href='#'>
                        <div className='apps p-2 radius-10 text-center'>
                          <div className='apps-icon-box mb-1 text-dark bg-warning bg-gradient'>
                            <i className='bi bi-book-half' />
                          </div>
                          <p className='mb-0 apps-name'>Story</p>
                        </div>
                      </a>
                    </div> */}
                  </div>
                  {/*end row*/}
                </div>
              </li>
              {/* <li className='nav-item dropdown dropdown-large'>
                <a
                  className='nav-link dropdown-toggle dropdown-toggle-nocaret'
                  href='#'
                  data-bs-toggle='dropdown'
                >
                  <div className='messages'>
                    <span className='notify-badge'>5</span>
                    <i className='bi bi-messenger' />
                  </div>
                </a>
                <div className='dropdown-menu dropdown-menu-end p-0'>
                  <div className='p-2 border-bottom m-2'>
                    <h5 className='h5 mb-0'>Messages</h5>
                  </div>
                  <div className='header-message-list p-2'>
                    <div className='dropdown-item bg-light radius-10 mb-1'>
                      <form className='dropdown-searchbar position-relative'>
                        <div className='position-absolute top-50 start-0 translate-middle-y px-3 search-icon'>
                          <i className='bi bi-search' />
                        </div>
                        <input
                          className='form-control'
                          type='search'
                          placeholder='Search Messages'
                        />
                      </form>
                    </div>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <img
                          src='assets/images/avatars/avatar-1.png'
                          alt=''
                          className='rounded-circle'
                          width={52}
                          height={52}
                        />
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Amelio Joly{' '}
                            <span className='msg-time float-end text-secondary'>
                              1 m
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            The standard chunk of lorem...
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <img
                          src='assets/images/avatars/avatar-2.png'
                          alt=''
                          className='rounded-circle'
                          width={52}
                          height={52}
                        />
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Althea Cabardo{' '}
                            <span className='msg-time float-end text-secondary'>
                              7 m
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            Many desktop publishing
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <img
                          src='assets/images/avatars/avatar-3.png'
                          alt=''
                          className='rounded-circle'
                          width={52}
                          height={52}
                        />
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Katherine Pechon{' '}
                            <span className='msg-time float-end text-secondary'>
                              2 h
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            Making this the first true
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <img
                          src='assets/images/avatars/avatar-4.png'
                          alt=''
                          className='rounded-circle'
                          width={52}
                          height={52}
                        />
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Peter Costanzo{' '}
                            <span className='msg-time float-end text-secondary'>
                              3 h
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            It was popularised in the 1960
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <img
                          src='assets/images/avatars/avatar-5.png'
                          alt=''
                          className='rounded-circle'
                          width={52}
                          height={52}
                        />
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Thomas Wheeler{' '}
                            <span className='msg-time float-end text-secondary'>
                              1 d
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            If you are going to use a passage
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <img
                          src='assets/images/avatars/avatar-6.png'
                          alt=''
                          className='rounded-circle'
                          width={52}
                          height={52}
                        />
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Johnny Seitz{' '}
                            <span className='msg-time float-end text-secondary'>
                              2 w
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            All the Lorem Ipsum generators
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <img
                          src='assets/images/avatars/avatar-1.png'
                          alt=''
                          className='rounded-circle'
                          width={52}
                          height={52}
                        />
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Amelio Joly{' '}
                            <span className='msg-time float-end text-secondary'>
                              1 m
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            The standard chunk of lorem...
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <img
                          src='assets/images/avatars/avatar-2.png'
                          alt=''
                          className='rounded-circle'
                          width={52}
                          height={52}
                        />
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Althea Cabardo{' '}
                            <span className='msg-time float-end text-secondary'>
                              7 m
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            Many desktop publishing
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <img
                          src='assets/images/avatars/avatar-3.png'
                          alt=''
                          className='rounded-circle'
                          width={52}
                          height={52}
                        />
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Katherine Pechon{' '}
                            <span className='msg-time float-end text-secondary'>
                              2 h
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            Making this the first true
                          </small>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className='p-2'>
                    <div>
                      <hr className='dropdown-divider' />
                    </div>
                    <a className='dropdown-item' href='#'>
                      <div className='text-center'>View All Messages</div>
                    </a>
                  </div>
                </div>
              </li> */}
              <li className='nav-item dropdown dropdown-large d-none d-sm-block'>
                <a
                  className='nav-link dropdown-toggle dropdown-toggle-nocaret'
                  href='#'
                  data-bs-toggle='dropdown'
                >
                  <div className='notifications'>
                    <span className='notify-badge'>6</span>
                    <i className='bi bi-bell-fill' />
                  </div>
                </a>
                <div className='dropdown-menu dropdown-menu-end p-0'>
                  <div className='p-2 border-bottom m-2'>
                    <h5 className='h5 mb-0'>Notifications</h5>
                  </div>
                  <div className='header-notifications-list p-2'>
                    {/* <div className='dropdown-item bg-light radius-10 mb-1'>
                      <form className='dropdown-searchbar position-relative'>
                        <div className='position-absolute top-50 start-0 translate-middle-y px-3 search-icon'>
                          <i className='bi bi-search' />
                        </div>
                        <input
                          className='form-control'
                          type='search'
                          placeholder='Search Messages'
                        />
                      </form>
                    </div> */}
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <div className='notification-box'>
                          <i className='bi bi-basket2-fill' />
                        </div>
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            New Orders{' '}
                            <span className='msg-time float-end text-secondary'>
                              1 m
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            You have recived new orders
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <div className='notification-box'>
                          <i className='bi bi-people-fill' />
                        </div>
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            New Customers{' '}
                            <span className='msg-time float-end text-secondary'>
                              7 m
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            5 new user registered
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <div className='notification-box'>
                          <i className='bi bi-file-earmark-bar-graph-fill' />
                        </div>
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            24 PDF File{' '}
                            <span className='msg-time float-end text-secondary'>
                              2 h
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            The pdf files generated
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <div className='notification-box'>
                          <i className='bi bi-collection-play-fill' />
                        </div>
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            Time Response{' '}
                            <span className='msg-time float-end text-secondary'>
                              3 h
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            5.1 min avarage time response
                          </small>
                        </div>
                      </div>
                    </a>
                    <a className='dropdown-item' href='#'>
                      <div className='d-flex align-items-center'>
                        <div className='notification-box'>
                          <i className='bi bi-cursor-fill' />
                        </div>
                        <div className='ms-3 flex-grow-1'>
                          <h6 className='mb-0 dropdown-msg-user'>
                            New Product Approved{' '}
                            <span className='msg-time float-end text-secondary'>
                              1 d
                            </span>
                          </h6>
                          <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                            Your new product has approved
                          </small>
                        </div>
                      </div>
                    </a>
                    {/* <a className='dropdown-item' href='#'> */}
                    <div className='d-flex align-items-center'>
                      <div className='notification-box'>
                        <i className='bi bi-gift-fill' />
                      </div>
                      <div className='ms-3 flex-grow-1'>
                        <h6 className='mb-0 dropdown-msg-user'>
                          New Comments{' '}
                          <span className='msg-time float-end text-secondary'>
                            2 w
                          </span>
                        </h6>
                        <small className='mb-0 dropdown-msg-text text-secondary d-flex align-items-center'>
                          New customer comments recived
                        </small>
                      </div>
                    </div>
                    {/* </a> */}
                  </div>
                  <div className='p-2'>
                    <div>
                      <hr className='dropdown-divider' />
                    </div>
                    {/* <a className='dropdown-item' href='#'> */}
                    <div className='text-center'>View All Notifications</div>
                    {/* </a> */}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Change Passsword Modal Body */}
      <div
        className='modal fade'
        id='changeLoginUserPassword'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Change Password
              </h5>
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

export default Navbar;
