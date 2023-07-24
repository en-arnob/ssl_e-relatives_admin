import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
// import { FaRegFilePdf } from 'react-icons/fa';

const RoleListPage = () => {
  const [roles, setRoles] = useState([]);
  const [editModalData, setEditModalData] = useState({});
  const [deleteModalData, setDeleteModalData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  // console.log(isRequired);
  console.log(isChecked);

  const handlerOnEditFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const roleName = form.roleName.value;
    const roleInfo = form.roleInfo.value;
    const rolePriority = form.rolePriority.value;
    const status = form.roleStatus.value;
    const roleStatus = status === 'true' ? 1 : 0;

    console.log(status);
    console.log(roleStatus);

    const rolesData = {
      name: roleName,
      info: roleInfo,
      priority: rolePriority,
      status: roleStatus,
    };
    console.log(rolesData);

    methodUpdateRole(rolesData);
  };

  const methodUpdateRole = async (rolesData) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/roles/role/${editModalData.id}`,
      rolesData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(res);
    if (res.status === 200 && res?.data?.status === 'success') {
      toast.success('User Role Updated successfully!!');
      setRefresh(!refresh);
    } else {
      toast.error(res?.data?.message);
      setRefresh(!refresh);
    }
  };

  const handlerOnDelete = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/roles/role/${deleteModalData.id}`
    );
    // console.log(res);
    if (res.status === 200) {
      toast.success('User Role Deleted successfully!!');
      setRefresh(!refresh);
    }
  };

  const handlerOnCreateFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const roleName = form.roleName.value;
    const roleInfo = form.roleInfo.value;
    const rolePriority = form.rolePriority.value;
    const status = form.roleStatus.value;
    const roleStatus = status === 'true' ? 1 : 0;

    console.log(status);
    console.log(roleStatus);

    const rolesData = {
      name: roleName,
      info: roleInfo,
      priority: rolePriority,
      status: roleStatus,
    };
    form.reset();

    console.log(rolesData);

    methodCreateRole(rolesData);
  };

  const methodCreateRole = async (rolesData) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/roles/create-role`,
      rolesData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(res);
    if (res.status === 201) {
      toast.success('User Role Created successfully!!');
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/roles`
      );
      const data = response.data.data;
      setRoles(data);
      setRefresh(refresh);
    };
    fetchAPI();
  }, [refresh]);

  const columns = [
    {
      key: 'name',
      text: 'Name',
      align: 'left',
      sortable: true,
    },
    {
      key: 'info',
      text: 'Info',
      className: 'info',
      align: 'left',
      sortable: true,
    },
    {
      key: 'priority',
      text: 'Priority',
      className: 'priority',
      sortable: true,
    },
    {
      key: 'status',
      text: 'Status',
      className: 'status',
      sortable: true,
      cell: (record) => {
        return <>{record.status === 1 ? 'Active' : 'Inactive'}</>;
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
        // console.log(record);
        return (
          <>
            {/* Edit Modal Trigger Button */}
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
              data-bs-target={`#editRoleModal-${record.id}`}
              style={{ marginRight: '5px' }}
            >
              <i className='fa fa-edit'></i>
            </button>

            {/* Delete Modal Trigger Button */}
            <button
              type='button'
              onClick={() => setDeleteModalData(record)}
              className='btn btn-danger btn-sm'
              data-bs-toggle='modal'
              data-bs-target={`#deleteRoleModal-${record.id}`}
              style={{ marginRight: '5px' }}
            >
              <i className='fa fa-trash'></i>
            </button>

            {/* Edit Modal Body */}

            <div
              className='modal fade'
              id={`editRoleModal-${record.id}`}
              tabIndex='-1'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                      Edit Role
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <form onSubmit={(e) => handlerOnEditFormSubmit(e)}>
                    <div className='modal-body'>
                      <div className='row mb-3'>
                        <label className='col-sm-3 col-form-label'>
                          Name <span className='text-danger'>*</span>
                        </label>
                        <div className='col-sm-9'>
                          <input
                            type='text'
                            name='roleName'
                            defaultValue={record?.name}
                            className='form-control'
                            // required
                          />
                        </div>
                      </div>
                      <div className='row mb-3'>
                        <label className='col-sm-3 col-form-label'>Info</label>
                        <div className='col-sm-9'>
                          <textarea
                            name='roleInfo'
                            defaultValue={record.info}
                            className='form-control w-100'
                            rows='3'
                            maxLength='200'
                          ></textarea>
                        </div>
                      </div>
                      <div className='row mb-3'>
                        <label className='col-sm-3 col-form-label'>
                          Priority
                        </label>
                        <div className='col-sm-9'>
                          <input
                            type='number'
                            name='rolePriority'
                            defaultValue={record.priority}
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
                                name='roleStatus'
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
              id={`deleteRoleModal-${record.id}`}
              tabIndex={-1}
              style={{ display: 'none' }}
              aria-hidden='true'
            >
              <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title'>Delete Role</h5>
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
    //   className: 'btn btn-primary buttons-pdf',
    //   title: 'Export TEst',
    //   children: [
    //     <span>
    //       {/* <FaRegFilePdf /> */}
    //     </span>,
    //   ],
    //   onClick: (event) => {
    //     console.log(event);
    //   },
    // },
    // {
    //   className: 'btn btn-primary buttons-pdf',
    //   title: 'Export TEst',
    //   children: [
    //     <span>
    //       <i
    //         className='glyphicon glyphicon-print fa fa-print'
    //         aria-hidden='true'
    //       ></i>
    //     </span>,
    //   ],
    //   onClick: (event) => {
    //     console.log(event);
    //   },
    //   onDoubleClick: (event) => {
    //     console.log('doubleClick');
    //   },
    // },
  ];

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <div className='border p-3 rounded'>
            <div className='card-box'>
              <h6 className='mb-0 text-uppercase'>Roles List</h6>
              <div className='col'>
                {/* Create Role trigger modal Button */}
                <button
                  type='button'
                  onClick={() => setIsChecked(true)}
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#createRoleModal'
                >
                  <i className='fa-solid fa-plus'></i> Add New
                </button>
              </div>
            </div>

            <hr />

            <ReactDatatable
              config={config}
              records={roles}
              columns={columns}
              extraButtons={extraButtons}
            />
          </div>
        </div>
      </div>

      {/* Create Modal Body */}
      <div
        className='modal fade'
        id='createRoleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Create Role
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
                <div className='row mb-3'>
                  <label className='col-sm-3 col-form-label'>
                    Name <span className='text-danger'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      name='roleName'
                      className='form-control'
                      required
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-sm-3 col-form-label'>Info</label>
                  <div className='col-sm-9'>
                    <textarea
                      name='roleInfo'
                      className='form-control w-100'
                      rows='3'
                      maxLength='200'
                    ></textarea>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-sm-3 col-form-label'>Priority</label>
                  <div className='col-sm-9'>
                    <input
                      type='number'
                      name='rolePriority'
                      // defaultValue={record.priority}
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
                          name='roleStatus'
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
                  // data-bs-dismiss={` ${isRequired === false && 'modal'} `}
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleListPage;
