import ReactDatatable from '@ashvin27/react-datatable';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PasswordChangeModal from '../../../components/Modal/PasswordChangeModal/PasswordChangeModal';

const jwtToken = localStorage.getItem('jwtToken');

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editModalData, setEditModalData] = useState({});
  const [deleteModalData, setDeleteModalData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [passwordModalData, setPasswordModalData] = useState({});

  const navigate = useNavigate();

  console.log(isChecked);

  const handlerOnCreateFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const dateOfBirth = form.date_of_birth.value;
    const address1 = form.address1.value;
    const address2 = form.address2.value;
    const image = form.image.files[0];
    const mobile = form.mobile.value;
    const password = form.password.value;
    const contactPerson = form.contactPerson.value;
    const nid = form.nid.value;
    const creditLimit = form.credit_limit.value;
    const commissionRate = form.commission_rate.value;
    const remarks = form.remarks.value;
    const role = parseInt(form.role.value);

    const status = form.status.value;
    const userStatus = status === 'true' ? 1 : 0;

    const formData = new FormData();
    formData.append('image', image);

    console.log(commissionRate);
    // console.log(status);
    // console.log(userStatus);

    // Image Hosting Method(API)
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/users/user/upload-image`,
        formData
      )
      .then((res) => {
        console.log(res);
        const imagePath = res.data.filename;
        console.log('image', imagePath);

        const usersData = {
          f_name: firstName,
          l_name: lastName,
          email: email,
          date_of_birth: dateOfBirth,
          address1: address1,
          address2: address2,
          password: password,
          mobile: mobile,
          contactPerson: contactPerson,
          nid: nid,
          credit_limit: creditLimit,
          commission_rate: commissionRate,
          remarks: remarks,
          role_id: role,
          status: userStatus,
        };

        if (imagePath) {
          usersData.image = imagePath;
        }
        console.log(usersData);

        methodCreateUser(usersData, form);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const methodCreateUser = async (usersData, form) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/user/signup`,
      usersData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(res);

    if (res.status === 201) {
      toast.success('User Created successfully!!');
      setRefresh(!refresh);
      form.reset();
    } else {
      toast.error('User Already Created Using This Mobile Number!!');
    }
  };

  const handlerOnEditFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const dateOfBirth = form.date_of_birth.value;
    const address1 = form.address1.value;
    const address2 = form.address2.value;
    const image = form.image.files[0];
    const mobile = form.mobile.value;
    const contactPerson = form.contactPerson.value;
    const nid = form.nid.value;
    const creditLimit = form.credit_limit.value;
    const commissionRate = form.commission_rate.value;
    const remarks = form.remarks.value;
    const role = parseInt(form.role.value);

    const status = form.status.value;
    const userStatus = status === 'true' ? 1 : 0;

    const formData = new FormData();
    formData.append('image', image);

    console.log(commissionRate);
    // console.log(status);
    // console.log(userStatus);

    const usersData = {
      f_name: firstName,
      l_name: lastName,
      email: email,
      date_of_birth: dateOfBirth,
      address1: address1,
      address2: address2,
      mobile: mobile,
      contactPerson: contactPerson,
      nid: nid,
      credit_limit: creditLimit,
      commission_rate: commissionRate,
      remarks: remarks,
      role_id: role,
      status: userStatus,
    };

    // Image Hosting Method(API)
    if (image) {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/users/user/upload-image`,
          formData
        )
        .then((res) => {
          console.log(res);
          const imagePath = res?.data?.filename;
          console.log('image', imagePath);

          if (imagePath) {
            usersData.image = imagePath;
          }

          console.log(usersData);

          methodUpdateUser(usersData);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      methodUpdateUser(usersData);
    }
  };

  const methodUpdateUser = async (usersData) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/users/user/${editModalData?.id}`,
      usersData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(res);
    if (res.status === 200 && res?.data?.status === 'success') {
      toast.success('User Updated successfully!!');
      setRefresh(!refresh);
    } else {
      toast.error(res?.data?.message);
      setRefresh(!refresh);
    }
  };

  const handlerOnDelete = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/users/user/${deleteModalData?.id}`
    );
    // console.log(res);
    if (res.status === 200) {
      toast.success('User Deleted successfully!!');
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    const fetchUserAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/all-users`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage?.getItem('jwtToken')}`,
          },
        }
      );
      const data = response?.data?.data;
      console.log(data);
      setUsers(data);
      setRefresh(refresh);
    };
    fetchUserAPI();

    const fetchRoleAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/roles`
      );
      const data = response?.data?.data;
      console.log(data);
      setRoles(data);
      setRefresh(refresh);
    };
    fetchRoleAPI();
  }, [refresh]);

  // console.log(users);

  const columns = [
    {
      key: 'image',
      text: 'Image',
      className: 'image',
      align: 'left',
      sortable: true,
      cell: (record) => {
        return (
          <>
            <img
              className=' img-fluid'
              style={{ width: '50px' }}
              src={`${process.env.REACT_APP_UPLOAD_URL}/users/${record?.image}`}
              // src={`${process.env.REACT_APP_UPLOAD_URL}/users/${record?.image}`}
              alt='Profile Pic'
            />
          </>
        );
      },
    },
    {
      key: 'registration_no',
      text: 'Registration No',
      className: 'registration_no',
      align: 'left',
      sortable: true,
      cell: (record) => {
        return <>{record?.registration_no}</>;
      },
    },
    {
      key: 'name',
      text: 'Name / Company',
      className: 'info',
      align: 'left',
      sortable: true,
      cell: (record) => {
        return (
          <>
            {record?.f_name} {record?.l_name}
          </>
        );
      },
    },
    {
      key: 'role_id',
      text: 'Role',
      className: 'status',
      sortable: true,
      cell: (record) => {
        return <>{record?.role?.name}</>;
      },
    },
    {
      key: 'mobile',
      text: 'Mobile',
      className: 'mobile',
      sortable: true,
    },
    {
      key: 'email',
      text: 'Email',
      className: 'email',
      sortable: true,
      cell: (record) => {
        return <>{record?.email}</>;
      },
    },
    {
      key: '	date_of_birth',
      text: 'Date of Birth',
      className: '	date_of_birth',
      sortable: true,
      cell: (record) => {
        return <>{record?.date_of_birth}</>;
      },
    },
    {
      key: 'contact',
      text: 'Contact Person',
      className: 'contactPerson',
      sortable: true,
      cell: (record) => {
        return <>{record?.contact_person}</>;
      },
    },
    {
      key: 'nid',
      text: 'NID Number',
      className: 'nidNumber',
      sortable: true,
      cell: (record) => {
        return <>{record?.nid}</>;
      },
    },
    {
      key: 'credit_limit',
      text: 'Credit Limit',
      className: 'credit_limit',
      sortable: true,
      cell: (record) => {
        return <>BDT {record?.credit_limit}</>;
      },
    },
    {
      key: 'commission_rate',
      text: 'Commission Rate',
      className: 'commission_rate',
      sortable: true,
      cell: (record) => {
        return <>{record?.commission_rate}%</>;
      },
    },
    {
      key: 'wallet',
      text: 'Wallet',
      className: 'wallet',
      sortable: true,
      cell: (record) => {
        return <>{record?.wallet}</>;
      },
    },
    {
      key: 'status',
      text: 'Status',
      className: 'status',
      sortable: true,
      cell: (record) => {
        return <>{record?.status === 1 ? 'Active' : 'Inactive'}</>;
      },
    },
    {
      key: 'action',
      text: 'Action',
      className: 'action',
      width: 100,
      align: 'left',
      sortable: false,
      cell: (record) => {
        const filterRoles = roles?.filter((filterRole) => {
          return filterRole?.id !== record?.role_id;
        });

        // console.log(filterRoles);
        return (
          <>
            {/* View Profile Trigger Button */}
            <button
              type='button'
              onClick={() =>
                navigate('/dashboard/profile', { state: { record } })
              }
              className='btn btn-warning btn-sm'
              style={{ marginRight: '5px' }}
            >
              <i className='fa-regular fa-eye'></i>
            </button>

            {/* Change Password Trigger Button */}
            <button
              type='button'
              onClick={() => setPasswordModalData(record)}
              className='btn btn-dark btn-sm'
              data-bs-toggle='modal'
              data-bs-target={`#changePasswordModal`}
              style={{ marginRight: '5px' }}
            >
              <i className='fa-solid fa-key'></i>
            </button>

            {/* Edit User Trigger Button */}
            <button
              type='button'
              onClick={() => {
                setEditModalData(record);
                if (record.status === 1) {
                  setIsChecked(true);
                } else {
                  setIsChecked(false);
                }
              }}
              className='btn btn-primary btn-sm'
              data-bs-toggle='modal'
              data-bs-target={`#editUserModal-${record.id}`}
              style={{ marginRight: '5px' }}
            >
              <i className='fa fa-edit'></i>
            </button>

            {/* Delete User Trigger Button */}
            <button
              type='button'
              onClick={() => setDeleteModalData(record)}
              className='btn btn-danger btn-sm'
              data-bs-toggle='modal'
              data-bs-target={`#deleteUserModal-${record.id}`}
              style={{ marginRight: '5px' }}
            >
              <i className='fa fa-trash'></i>
            </button>

            {/* Edit Modal Body */}

            <div
              className='modal fade'
              id={`editUserModal-${record.id}`}
              tabIndex='-1'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog modal-xl modal-dialog-centered'>
                <div className='modal-content modal-dialog-scrollable'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                      Edit User
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <form onSubmit={(e) => handlerOnEditFormSubmit(e)}>
                    <div className='modal-body '>
                      <div className='row d-flex justify-content-between'>
                        <div className='col-6 pe-4 '>
                          <div className='row mb-3'>
                            <label className='col-sm-3 col-form-label'>
                              Select Role <span className='text-danger'>*</span>
                            </label>
                            <div className='col-sm-9'>
                              <select
                                className='form-select'
                                name='role'
                                aria-label='Default select example'
                                // required
                              >
                                <option value={record?.role_id} selected>
                                  {record?.role?.name}
                                </option>

                                {filterRoles?.map((role) => (
                                  <option
                                    key={role?.id}
                                    value={parseInt(role?.id)}
                                  >
                                    {role?.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className='row mb-3 d-flex align-items-center'>
                            <label className='col-sm-3 col-form-label'>
                              <img
                                className=' img-fluid w-75 h-75 rounded-circle'
                                src={`${process.env.REACT_APP_UPLOAD_URL}/users/${record?.image}`}
                                alt='Profile Pic'
                              />
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='file'
                                accept='image/*'
                                name='image'
                                // defaultValue={}
                                className='form-control'
                              />
                            </div>
                          </div>
                          <div className='row mb-3 d-flex align-items-center'>
                            <label className='col-sm-3 col-form-label'>
                              First Name / Company{' '}
                              <span className='text-danger'>*</span>
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='text'
                                name='firstName'
                                defaultValue={record.f_name}
                                className='form-control'
                                // required
                              />
                            </div>
                          </div>

                          <div className='row mb-3'>
                            <label className='col-sm-3 col-form-label'>
                              Last Name
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='text'
                                name='lastName'
                                defaultValue={record.l_name}
                                className='form-control'
                              />
                            </div>
                          </div>
                          <div className='row mb-3 d-flex align-items-center'>
                            <label className='col-sm-3 col-form-label'>
                              Mobile Number
                              <span className='text-danger'>*</span>
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='tel'
                                // pattern='[0-9]{3}-[0-9]{4}-[0-9]{4}'
                                name='mobile'
                                defaultValue={record.mobile}
                                className='form-control'
                                // required
                              />
                            </div>
                          </div>
                          <div className='row mb-3'>
                            <label className='col-sm-3 col-form-label'>
                              E-mail
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='email'
                                name='email'
                                defaultValue={record.email}
                                className='form-control'
                              />
                            </div>
                          </div>
                          <div className='row mb-3'>
                            <label className='col-sm-3 col-form-label'>
                              Date of Birth
                            </label>
                            <div className='col-sm-9'>
                              <input
                                id='date'
                                type='date'
                                name='date_of_birth'
                                defaultValue={record?.date_of_birth}
                                className='form-control'
                                placeholder='Date Picker...'
                              />
                            </div>
                          </div>
                          <div className='row mb-3 d-flex align-items-center'>
                            <label className='col-sm-3 col-form-label'>
                              Contact Person
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='text'
                                name='contactPerson'
                                defaultValue={record.contact_person}
                                className='form-control'
                              />
                            </div>
                          </div>
                          <div className='row mb-3'>
                            <label className='col-sm-3 col-form-label'>
                              NID Number
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='number'
                                name='nid'
                                defaultValue={record.nid}
                                className='form-control'
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-6 ps-4'>
                          <div className='row mb-3'>
                            <label className='col-sm-3 col-form-label'>
                              Address_1
                            </label>
                            <div className='col-sm-9'>
                              <textarea
                                name='address1'
                                defaultValue={record.address_1}
                                className='form-control w-100'
                                rows='3'
                                maxLength='200'
                              ></textarea>
                            </div>
                          </div>
                          <div className='row mb-3'>
                            <label className='col-sm-3 col-form-label'>
                              Address_2
                            </label>
                            <div className='col-sm-9'>
                              <textarea
                                name='address2'
                                defaultValue={record.address_2}
                                className='form-control w-100'
                                rows='3'
                                maxLength='200'
                              ></textarea>
                            </div>
                          </div>
                          <div className='row mb-3'>
                            <label className='col-sm-3 col-form-label'>
                              Remarks
                            </label>
                            <div className='col-sm-9'>
                              <textarea
                                name='remarks'
                                defaultValue={record.remarks}
                                className='form-control w-100'
                                rows='3'
                                maxLength='200'
                              ></textarea>
                            </div>
                          </div>

                          <div className='row mb-3 d-flex align-items-center'>
                            <label className='col-sm-3 col-form-label'>
                              Credit Limit (BDT)
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='number'
                                name='credit_limit'
                                className='form-control'
                                defaultValue={record?.credit_limit}
                              />
                            </div>
                          </div>
                          <div className='row mb-3 d-flex align-items-center'>
                            <label className='col-sm-3 col-form-label'>
                              Commission Rate (%)
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='number'
                                name='commission_rate'
                                defaultValue={record?.commission_rate}
                                className='form-control'
                              />
                            </div>
                          </div>
                          <div className='row mb-3 d-flex align-items-center justify-content-end'>
                            <div className='col-sm-9'>
                              <div className='col-sm-12'>
                                <div
                                  className='  d-flex align-items-center  justify-content-end'
                                  defaultChecked={
                                    record.status === 1 ? true : false
                                  }
                                >
                                  <input
                                    className='form-check-input mt-0 me-2'
                                    type='checkbox'
                                    defaultChecked={
                                      record.status === 1 ? true : false
                                    }
                                    name='status'
                                    value={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                    id={`flexCheckChecked-${record.id}`}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor={`flexCheckChecked-${record.id}`}
                                  >
                                    Active
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button
                        type='submit'
                        className='btn btn-primary'
                        data-bs-dismiss='modal'
                      >
                        Update changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Delete Modal Body */}

            <div
              className='modal fade'
              id={`deleteUserModal-${record.id}`}
              tabIndex={-1}
              style={{ display: 'none' }}
              aria-hidden='true'
            >
              <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title'>Delete User</h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    />
                  </div>
                  <div className='modal-body pb-0'>
                    <div className='mb-3 row '>
                      <div className='col-sm-10'>
                        <p>Are you sure you want to delete?</p>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => handlerOnDelete(deleteModalData)}
                      data-bs-dismiss='modal'
                    >
                      Yes
                    </button>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const config = {
    page_size: 10,
    show_filter: true,
    show_length_menu: true,
    show_pagination: true,
    pagination: 'advance',
    length_menu: [10, 50, 100],
    button: {
      excel: true,
      print: true,
      extra: true,
    },
  };

  const extraButtons = [
    // {
    //     className:"btn btn-primary buttons-pdf",
    //     title:"Export TEst",
    //     children:[
    //         <span>
    //         <FaRegFilePdf/>
    //         </span>
    //     ],
    //     onClick:(event)=>{
    //         console.log(event);
    //     },
    // },
    // {
    //     className:"btn btn-primary buttons-pdf",
    //     title:"Export TEst",
    //     children:[
    //         <span>
    //         <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
    //         </span>
    //     ],
    //     onClick:(event)=>{
    //         console.log(event);
    //     },
    //     onDoubleClick:(event)=>{
    //         console.log("doubleClick")
    //     }
    // }
  ];

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <div className='border p-3 rounded'>
            <div className='card-box'>
              <h6 className='mb-0 text-uppercase'>Users List</h6>
              <div className='col'>
                {/* Create User trigger modal Button */}
                <button
                  type='button'
                  onClick={() => setIsChecked(true)}
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#createUserModal'
                >
                  <i className='fa-solid fa-plus'></i> Add New
                </button>
              </div>
            </div>

            <hr />

            <ReactDatatable
              config={config}
              records={users}
              columns={columns}
              extraButtons={extraButtons}
            />
          </div>
        </div>
      </div>

      {/* Create Modal Body */}
      <div
        className='modal fade'
        id={`createUserModal`}
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl modal-dialog-centered'>
          <div className='modal-content  modal-dialog-scrollable '>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Create User
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <form onSubmit={(e) => handlerOnCreateFormSubmit(e)}>
              <div className='modal-body'>
                <div className='row d-flex align-items-start justify-content-between '>
                  <div className='col-6 pe-4'>
                    <div className='row mb-3'>
                      <label className='col-sm-3 col-form-label'>
                        Select Role <span className='text-danger'>*</span>
                      </label>
                      <div className='col-sm-9'>
                        <select
                          className='form-select'
                          name='role'
                          aria-label='Default select example'
                          required
                        >
                          {roles?.map((role) => (
                            <option key={role.id} value={parseInt(role?.id)}>
                              {role?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className='row mb-3 d-flex align-items-center'>
                      <label className='col-sm-3 col-form-label'>
                        First Name / Company{' '}
                        <span className='text-danger'>*</span>
                      </label>
                      <div className='col-sm-9'>
                        <input
                          type='text'
                          name='firstName'
                          className='form-control'
                          required
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-3 col-form-label'>
                        Last Name
                      </label>
                      <div className='col-sm-9'>
                        <input
                          type='text'
                          name='lastName'
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='row mb-3 d-flex align-items-center'>
                      <label className='col-sm-3 col-form-label'>
                        Mobile Number<span className='text-danger'>*</span>
                      </label>
                      <div className='col-sm-9'>
                        <input
                          type='tel'
                          // pattern='[0-9]{3}-[0-9]{4}-[0-9]{4}'
                          name='mobile'
                          className='form-control'
                          required
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-3 col-form-label'>
                        Password <span className='text-danger'>*</span>
                      </label>
                      <div className='col-sm-9'>
                        <input
                          type='text'
                          name='password'
                          className='form-control'
                          required
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-3 col-form-label'>E-mail</label>
                      <div className='col-sm-9'>
                        <input
                          type='email'
                          name='email'
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-3 col-form-label'>
                        Date of Birth
                      </label>
                      <div className='col-sm-9'>
                        <input
                          // id='date'
                          type='date'
                          data-date-format='YYYY MM DD'
                          name='date_of_birth'
                          className='form-control'
                          placeholder='Date Picker...'
                        />
                      </div>
                    </div>

                    <div className='row mb-3 d-flex align-items-center'>
                      <label className='col-sm-3 col-form-label'>
                        Contact Person
                      </label>
                      <div className='col-sm-9'>
                        <input
                          type='text'
                          name='contactPerson'
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-3 col-form-label'>
                        NID Number
                      </label>
                      <div className='col-sm-9'>
                        <input
                          type='number'
                          name='nid'
                          className='form-control'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-6 ps-4'>
                    <div className='row mb-3'>
                      <label className='col-sm-3 col-form-label'>
                        Address_1
                      </label>
                      <div className='col-sm-9'>
                        <textarea
                          name='address1'
                          className='form-control w-100'
                          rows='3'
                          maxLength='200'
                        ></textarea>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-3 col-form-label'>
                        Address_2
                      </label>
                      <div className='col-sm-9'>
                        <textarea
                          name='address2'
                          className='form-control w-100'
                          rows='3'
                          maxLength='200'
                        ></textarea>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-3 col-form-label'>Remarks</label>
                      <div className='col-sm-9'>
                        <textarea
                          name='remarks'
                          className='form-control w-100'
                          rows='3'
                          maxLength='200'
                        ></textarea>
                      </div>
                    </div>
                    <div className='row mb-3 '>
                      <label className='col-sm-3 col-form-label'>
                        User Photo
                      </label>
                      <div className='col-sm-9'>
                        <input
                          type='file'
                          accept='image/*'
                          name='image'
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='row mb-3 d-flex align-items-center'>
                      <label className='col-sm-3 col-form-label'>
                        Credit Limit (BDT)
                      </label>
                      <div className='col-sm-9'>
                        <input
                          type='number'
                          name='credit_limit'
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='row mb-3 d-flex align-items-center'>
                      <label className='col-sm-3 col-form-label'>
                        Commission Rate (%)
                      </label>
                      <div className='col-sm-9'>
                        <input
                          type='number'
                          name='commission_rate'
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='row mb-3 d-flex align-items-center justify-content-end'>
                      <div className='col-sm-9'>
                        <div className='col-sm-12'>
                          <div className=' d-flex align-items-center  justify-content-end'>
                            <input
                              className='form-check-input mt-0 me-2'
                              type='checkbox'
                              checked={isChecked}
                              name='status'
                              value={isChecked}
                              onChange={() => setIsChecked(!isChecked)}
                              id='flexCheckChecked'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='flexCheckChecked'
                            >
                              Active
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button type='submit' className='btn btn-primary'>
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Modal Body */}
      <PasswordChangeModal
        id={`#changePasswordModal`}
        user={passwordModalData}
      />
    </>
  );
};

export default UserListPage;
