import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../../../Context/UserContextAPI';

const roomUrl = `${process.env.REACT_APP_API_BASE_URL}/room`;

const Room = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [checked, setChecked] = useState();
  const [form, setForm] = useState({
    name: '',
    floor: '',
    info: '',
    status: checked ? '1' : '0',
  });
  const columns = [
    {
      key: 'name',
      text: 'Name',
      align: 'left',
      sortable: true,
    },
    {
      key: 'floor',
      text: 'Floor',
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
      key: 'status',
      text: 'Status',
      className: 'status',
      sortable: true,
    },
    {
      key: 'action',
      text: 'Action',
      className: 'action',
      width: 100,
      align: 'left',
      sortable: false,
      cell: (data) => {
        return (
          <>
            <div className='col'>
              {/* Button trigger modal */}
              {accessPerm(12, 2) && (
<button
                type='button'
                className='btn btn-primary btn-sm'
                data-bs-toggle='modal'
                data-bs-target={`#editRoom-${data.id}`}
                style={{ marginRight: '5px' }}
                onClick={() => {
                  editHandler(data.id);
                }}
              >
                <i className='fa fa-edit'></i>
              </button>
              )}
              
              {/* Modal */}
              <div
                className='modal fade'
                id={`editRoom-${data.id}`}
                tabIndex={-1}
                style={{ display: 'none' }}
                aria-hidden='true'
              >
                <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Edit Room</h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      />
                    </div>
                    <div className='modal-body pb-0'>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='inputName'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className='col-sm-9'>
                          <input
                            name='name'
                            defaultValue={data?.name}
                            onChange={(e) => onchange(e)}
                            type='text'
                            className='form-control'
                            id='inputName'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='inputSymbol'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Floor
                        </label>
                        <div className='col-sm-9'>
                          <input
                            name='floor'
                            defaultValue={data?.floor}
                            onChange={(e) => onchange(e)}
                            type='text'
                            className='form-control'
                            id='inputSymbol'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row'>
                        <label
                          htmlFor='inputInfo'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Info
                        </label>
                        <div className='col-sm-9'>
                          <textarea
                            name='info'
                            defaultValue={data?.info}
                            onChange={(e) => onchange(e)}
                            type='textarea'
                            className='form-control'
                            id='inputInfo'
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className='mb-3 row'>
                        <div className='col-sm-12'>
                          <div className='form-check d-flex justify-content-end align-items-center'>
                            <input
                              onChange={() => handleCheck()}
                              className='form-check-input mt-0 me-2'
                              type='checkbox'
                              defaultChecked={checked}
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
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button
                        type='button'
                        className='btn btn-primary'
                        data-bs-dismiss='modal'
                        onClick={() => updateData(data.id)}
                      >
                        Update changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col'>
              {/* Button trigger modal */}
              {accessPerm(13, 3) && (
<button
                type='button'
                className='btn btn-danger btn-sm'
                data-bs-toggle='modal'
                data-bs-target={`#deleteRoom-${data.id}`}
                style={{ marginRight: '5px' }}
              >
                <i className='fa fa-trash'></i>
              </button>
              )}
              
              {/* Activity */}
              <div
                className='modal fade'
                id={`deleteRoom-${data.id}`}
                tabIndex={-1}
                style={{ display: 'none' }}
                aria-hidden='true'
              >
                <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Delete Room</h5>
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
                          <p>Are you sure you want to delete this Room?</p>
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => deleteData(data.id)}
                        data-bs-dismiss='modal'
                      >
                        Yes
                      </button>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-toggle='modal'
                        data-bs-target={`#deleteRoom-${data.id}`}
                      >
                        No
                      </button>
                    </div>
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

  const createData = () => {
    if (!form.name) {
      toast.error('Name can not be empty!');
    } else {
      axios
        .post(roomUrl, form)
        .then((response) => {
          fetchData();
          // console.log(response.data);
        })
        .catch((err) => console.log(err));
      console.log(form);
    }
  };
  const editHandler = (id) => {
    // filter data by id from data list
    // then form state update using setForm
    let obj = {};
    for (let room of data) {
      if (room.id == id) {
        obj = {
          name: room.name,
          floor: room.floor,
          info: room.info,
          status: room.status,
        };
        setForm(obj);
        if (room.status === 'active' || room.status === '1') {
          setChecked(true);
          // console.log(checked);
        } else {
          setChecked(false);
          // console.log(checked);
        }
      }
    }
    // console.log(obj);

    // window.location.reload(false);
  };

  const updateData = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/room/${id}`, form)
      .then((response) => {
        fetchData();
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const deleteData = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/room/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    fetchData();
  };

  const onchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = () => {
    setChecked(!checked);
    setForm({
      ...form,
      status: checked ? '0' : '1',
    });
  };

  const fetchData = () => {
    axios
      .get(roomUrl)
      .then((response) => {
        const updatedData = response.data.data.map((item) => {
          return {
            ...item,
            status: item.status === 1 ? 'active' : 'inactive',
          };
        });
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [form]);

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
              <h6 className='mb-0 text-uppercase'>Room Management</h6>
              <div className='col'>
                {/* Button trigger modal */}
                {accessPerm(13, 1) && (
<button
                  type='button'
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleVerticallycenteredActivity'
                >
                  <i className='fa-solid fa-plus'></i> Add New
                </button>
                )}
                
                {/* Modal */}
                <div
                  className='modal fade'
                  id='exampleVerticallycenteredActivity'
                  tabIndex={-1}
                  style={{ display: 'none' }}
                  aria-hidden='true'
                >
                  <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title'>Add New Room</h5>
                        <button
                          type='button'
                          className='btn-close'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        />
                      </div>
                      <div className='modal-body pb-0'>
                        <div className='mb-3 row '>
                          <label
                            htmlFor='inputName'
                            className='col-sm-3 col-form-label d-flex justify-content-start'
                          >
                            Name <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className='col-sm-9'>
                            <input
                              onChange={onchange}
                              name='name'
                              type='text'
                              className='form-control'
                              id='inputName'
                              required
                            />
                          </div>
                        </div>
                        <div className='mb-3 row '>
                          <label
                            htmlFor='inputFloor'
                            className='col-sm-3 col-form-label d-flex justify-content-start'
                          >
                            Floor
                          </label>
                          <div className='col-sm-9'>
                            <input
                              onChange={onchange}
                              name='floor'
                              type='text'
                              className='form-control'
                              id='inputFloor'
                              required
                            />
                          </div>
                        </div>
                        <div className='mb-3 row '>
                          <label
                            htmlFor='inputInfo'
                            className='col-sm-3 col-form-label d-flex justify-content-start'
                          >
                            Info
                          </label>
                          <div className='col-sm-9'>
                            <textarea
                              onChange={onchange}
                              name='info'
                              type='textarea'
                              className='form-control'
                              id='inputInfo'
                              rows={2}
                            />
                          </div>
                        </div>
                        <div className='mb-3 row '>
                          <div className='col-sm-12'>
                            <div className='form-check d-flex justify-content-end align-items-center'>
                              <input
                                onChange={() => handleCheck()}
                                className='form-check-input mt-0 me-2'
                                type='checkbox'
                                checked={checked}
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
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-bs-dismiss='modal'
                        >
                          Close
                        </button>
                        <button
                          type='button'
                          className='btn btn-primary'
                          data-bs-dismiss='modal'
                          onClick={createData}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <ReactDatatable
              config={config}
              records={data}
              columns={columns}
              extraButtons={extraButtons}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
