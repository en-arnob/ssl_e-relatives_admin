import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const stateUrl = 'process.env.REACT_APP_API_BASE_URL/state';

const State = () => {
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState({
    name: '',
    country_id: '',
    status: isChecked ? '1' : '0',
  });
  const [countryList, setCountryList] = useState([]);
  const [countryId, setCountryId] = useState(0);

  const columns = [
    {
      key: 'country',
      text: 'Country',
      align: 'left',
      sortable: true,
      cell: (data) => {
        return <>{data.country?.name}</>;
      },
    },

    {
      key: 'name',
      text: 'Name',
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
              <button
                type='button'
                className='btn btn-primary btn-sm'
                data-bs-toggle='modal'
                data-bs-target={`#editState-${data.id}`}
                style={{ marginRight: '5px' }}
                onClick={() => {
                  editHandler(data.id);
                }}
              >
                <i className='fa fa-edit'></i>
              </button>
              {/* Modal */}
              <div
                className='modal fade'
                id={`editState-${data.id}`}
                tabIndex={-1}
                style={{ display: 'none' }}
                aria-hidden='true'
              >
                <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Edit State</h5>
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
                            value={form.name}
                            type='text'
                            className='form-control'
                            id='inputName'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='inputNationality'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Country
                        </label>
                        <div className='col-sm-9'>
                          <select
                            value={countryId}
                            onChange={selectCountryHandler}
                            className='single-select form-select'
                          >
                            <option value={0}>Select a country</option>
                            {countryList.map((country) => (
                              <option value={country.id}>{country.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className='mb-3 row'>
                        <div className='col-sm-12'>
                          <div className='form-check d-flex justify-content-end align-items-center'>
                            <input
                              onChange={() => handleCheck()}
                              className='form-check-input mt-0 me-2'
                              type='checkbox'
                              checked={isChecked}
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
              <button
                type='button'
                className='btn btn-danger btn-sm'
                data-bs-toggle='modal'
                data-bs-target={`#deleteState-${data.id}`}
                style={{ marginRight: '5px' }}
              >
                <i className='fa fa-trash'></i>
              </button>
              {/* Activity */}
              <div
                className='modal fade'
                id={`deleteState-${data.id}`}
                tabIndex={-1}
                style={{ display: 'none' }}
                aria-hidden='true'
              >
                <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Delete State</h5>
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
                          <p>Are you sure you want to delete this State?</p>
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
                        data-bs-target={`#deleteState-${data.id}`}
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
    if (!form.country_id) {
      toast.error('Field can not be empty!');
    } else {
      axios
        .post(stateUrl, form)
        .then((response) => {
          console.log(response.data);
          fetchData();
        })
        .catch((err) => console.log(err));
      console.log(form);
    }

    // window.location.reload(false);
  };

  const editHandler = (id) => {
    // filter data by id from data list
    // then form state update using setForm
    let obj = {};
    for (let state of data) {
      if (state.id == id) {
        obj = {
          name: state.name,
          country_id: state.country.id,
          status: state.status,
        };
        setForm(obj);
        setCountryId(state.country.id);
        setIsChecked(state.status === '1');
      }
    }

    // window.location.reload(false);
  };

  const selectCountryHandler = (e) => {
    setCountryId(e.target.value);
    // console.log(e.target.value);
    setForm((prev) => {
      return {
        ...prev,
        country_id: e.target.value,
      };
    });
  };

  const updateData = (id) => {
    axios
      .put(`process.env.REACT_APP_API_BASE_URL/state/${id}`, form)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => console.log(error));

    // window.location.reload(false);
  };

  const deleteData = async (id) => {
    await axios
      .delete(`process.env.REACT_APP_API_BASE_URL/state/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    fetchData();
    // window.location.reload(false);
  };

  const onchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // console.log(form);
  };

  const handleCheck = () => {
    // console.log(form);
    setIsChecked(!isChecked);
    setForm({
      ...form,
      status: isChecked ? '0' : '1',
    });
    console.log(form);
  };

  // if (data) {
  //   data.map((item) => {
  //     if (item.status === 1) {
  //       item.status = "active";
  //     } else {
  //       item.status = "inactive";
  //     }
  //   });
  // }
  const fetchData = () => {
    axios
      .get(stateUrl)
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
  const fetchCountryList = () => {
    axios
      .get(`process.env.REACT_APP_API_BASE_URL/state/country/data`)
      .then((response) => setCountryList(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    fetchCountryList();
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
              <h6 className='mb-0 text-uppercase'>State List</h6>
              <div className='col'>
                {/* Button trigger modal */}
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleVerticallycenteredActivity'
                >
                  <i className='fa-solid fa-plus'></i> Add New
                </button>
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
                        <h5 className='modal-title'>Add New State</h5>
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
                            htmlFor='inputNationality'
                            className='col-sm-3 col-form-label d-flex justify-content-start'
                          >
                            Country
                          </label>
                          <div className='col-sm-9'>
                            <select
                              value={countryId}
                              onChange={selectCountryHandler}
                              className='single-select form-select'
                            >
                              <option value={0}>Select a country</option>
                              {countryList.map((country) => (
                                <option value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className='mb-3 row '>
                          <div className='col-sm-12'>
                            <div className='form-check d-flex justify-content-end align-items-center'>
                              <input
                                onChange={() => handleCheck()}
                                className='form-check-input mt-0 me-2'
                                type='checkbox'
                                checked={isChecked}
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
                          Save changes
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

export default State;
