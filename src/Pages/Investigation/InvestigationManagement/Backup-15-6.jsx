import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import * as fs from 'fs'

const notify = () => toast.error('Field can not be empty!');

const AddNewInv = () => {
  const navigate = useNavigate();
  // data fetched from api will be stored in this state
  const [data, setData] = useState({});
  const [vatId, setVatId] = useState(0);

  //instruments table data
  const [insData, setInsData] = useState([
    {
      instrument_id: '',
      qty: '',
    },
  ]);

  const plusInstrument = () => {
    setInsData([
      ...insData,
      {
        instrument_id: '',
        qty: '',
      },
    ]);
  };

  const delInstrument = (i) => {
    if (i < 0 || i >= insData.length) {
      console.log('not delete');
    } else {
      const deleteVal = [...insData];
      // console.log(i);
      deleteVal.splice(i, 1);
      setInsData(deleteVal);
    }
  };

  let fileArr = [];
  // const favData = new FormData();

  // data from user input for server put
  // const [upData, setUpData] = useState({
  //   website_name: "",
  //   tag_line: "",
  //   address: "",
  //   mobile: "",
  //   copyright: "",
  // })
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const selectVATHandler = (e) => {
    setVatId(e.target.value);
    // console.log(e.target.value);
    setData((prev) => {
      return {
        ...prev,
        vat_type: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    fileArr.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });

    if (
      data.website_name !== '' &&
      data.tag_line !== '' &&
      data.address !== '' &&
      data.mobile !== '' &&
      data.copyright !== '' &&
      data.vat_type !== ''
    ) {
      try {
        const url = `${process.env.REACT_APP_API_BASE_URL}/settings`;
        const { data: res } = await axios.put(url, data);
        setData(data);

        toast.success('Successfully updated!');
      } catch (error) {
        console.log(error);
      }
    } else {
      notify();
    }
    let uploadUrl = `${process.env.REACT_APP_API_BASE_URL}/settings/image-upload`;

    axios
      .post(uploadUrl, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    window.location.reload(false);
  };

  useEffect(() => {
    getData();
    // setUpData({...upData, [data.key] : data.value})
  }, []);

  // logo handling
  const getLogo = (e) => {
    // setLogoFile(e.target.files[0])
    // formData.append("files", e.target.files[0] );
    fileArr.push(e.target.files[0]);
    // formData.append("logoName", e.target.files[0].name );
    // setPreviewFile(URL.createObjectURL(e.target.files[0]));
  };

  // favicon handling
  // const [favFile, setFavFile] = useState('')

  const getFav = (e) => {
    // setFavFile(e.target.files[0])
    fileArr.push(e.target.files[0]);
    // formData.append("favName", e.target.files[0].name );
    // console.log(e.target.files[0])
  };

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/settings`)
      .then((response) => {
        const allData = response.data.data[0];
        setData(allData);
        setVatId(allData.vat_type);
        // formData.append('name', data.name)
        // console.log(formData)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className='row'>
        <div className='col-xl-12 mx-auto'>
          <div className='card'>
            <div className='card-body'>
              <form className='needs-validation'>
                <div className='border p-4 rounded'>
                  <div className='col-sm-12'>
                    <button
                      type='submit'
                      className='btn btn-outline-secondary px-2 mb-3'
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                      }}
                    >
                      Go Back{' '}
                      <span>
                        <i className='bi bi-arrow-left' />
                      </span>
                    </button>
                  </div>
                  <div className='card-title d-flex align-items-center'>
                    <h5 className='mb-0'>Add New Investigation</h5>
                  </div>
                  <hr />
                  <div class='row'>
                    <div class='col-sm-6'>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='inputCode'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Code <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className='col-sm-9'>
                          <input
                            onChange={onchange}
                            name='code'
                            type='text'
                            className='form-control'
                            id='inputCode'
                            required
                          />
                        </div>
                      </div>
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
                          htmlFor='inputDName'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Detailed Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className='col-sm-9'>
                          <input
                            onChange={onchange}
                            name='detailed_name'
                            type='text'
                            className='form-control'
                            id='inputDName'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='inputRT'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Report Title
                        </label>
                        <div className='col-sm-9'>
                          <input
                            onChange={onchange}
                            name='report_title'
                            type='text'
                            className='form-control'
                            id='inputRT'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='inputRST'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Report Sub Title
                        </label>
                        <div className='col-sm-9'>
                          <input
                            onChange={onchange}
                            name='report_sub_title'
                            type='text'
                            className='form-control'
                            id='inputRST'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='inputPrice'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Price <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className='col-sm-9'>
                          <input
                            onChange={onchange}
                            name='price'
                            type='number'
                            className='form-control'
                            id='inputPrice'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='discounted_price'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Discounted Price
                        </label>
                        <div className='col-sm-9'>
                          <input
                            onChange={onchange}
                            name='discounted_price'
                            type='number'
                            className='form-control'
                            id='discounted_price'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='vat'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          VAT %
                        </label>
                        <div className='col-sm-9'>
                          <input
                            onChange={onchange}
                            name='vat'
                            type='number'
                            className='form-control'
                            id='vat'
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class='col-sm-6'>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='commission_rate'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Commission Rate %
                        </label>
                        <div className='col-sm-9'>
                          <input
                            onChange={onchange}
                            name='commission_rate'
                            type='number'
                            className='form-control'
                            id='commission_rate'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='preparation_duration'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Preparation Duration (hr)
                        </label>
                        <div className='col-sm-9'>
                          <input
                            onChange={onchange}
                            name='name'
                            type='number'
                            className='form-control'
                            id='inputName'
                            required
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='delivery_time'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Delivery Time
                        </label>
                        <div className='col-sm-9'>
                          <input
                            className='result form-control'
                            type='text'
                            id='time'
                            placeholder='Pick a time'
                          />
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='room'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Room
                        </label>
                        <div className='col-sm-9'>
                          <select
                            // value={countryId}
                            // onChange={selectCountryHandler}
                            className='single-select form-select'
                          >
                            <option value={0}>Select Room</option>
                            {/* {countryList.map((country) => (
                              <option value={country.id}>{country.name}</option>
                            ))} */}
                          </select>
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='group'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Group <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className='col-sm-9'>
                          <select
                            // value={countryId}
                            // onChange={selectCountryHandler}
                            className='single-select form-select'
                          >
                            <option value={0}>Select Group</option>
                            {/* {countryList.map((country) => (
                              <option value={country.id}>{country.name}</option>
                            ))} */}
                          </select>
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='category'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Category <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className='col-sm-9'>
                          <select
                            // value={countryId}
                            // onChange={selectCountryHandler}
                            className='single-select form-select'
                          >
                            <option value={0}>Select Category</option>
                            {/* {countryList.map((country) => (
                              <option value={country.id}>{country.name}</option>
                            ))} */}
                          </select>
                        </div>
                      </div>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='report_type'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Report Type
                        </label>
                        <div className='col-sm-9'>
                          <select
                            // value={countryId}
                            // onChange={selectCountryHandler}
                            className='single-select form-select'
                          >
                            <option value={0}>Select Report Type</option>
                            <option value={1}>Text</option>
                            <option value={2}>Table</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class='row'>
                    <div class='col-sm-12'>
                      {/* Instrument Table */}
                      <div className='table-responsive mt-3'>
                        <table className='table align-middle'>
                          <thead className='table-success'>
                            <tr>
                              <th>Instrument</th>
                              <th>Quantity</th>
                              <th className='text-justify text-center'>Unit</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {insData.map((val, i) => (
                              <tr key={i}>
                                <td>
                                  <div className='col'>
                                    <select
                                      // value={countryId}
                                      // onChange={selectCountryHandler}
                                      className='single-select form-select'
                                    >
                                      <option value={0}>
                                        Select Instrument
                                      </option>
                                    </select>
                                  </div>
                                </td>
                                <td>
                                  <div className='col'>
                                    <input
                                      onChange={onchange}
                                      name='commission_rate'
                                      type='number'
                                      className='form-control'
                                      id='commission_rate'
                                      required
                                    />
                                  </div>
                                </td>
                                <td className='text-justify text-center'>
                                  Unit
                                </td>

                                <td>
                                  <div className='table-actions d-flex align-items-center gap-3 fs-6'>
                                    {i > 0 ? (
                                      <a
                                        href='javascript:;'
                                        className='text-danger'
                                        title='Delete'
                                        onClick={() => delInstrument(i)}
                                      >
                                        <i className='bi bi-trash-fill' />
                                      </a>
                                    ) : (
                                      ''
                                    )}
                                    {i === insData.length - 1 ? (
                                      <a
                                        href='javascript:;'
                                        className='text-primary'
                                        title='Views'
                                        onClick={plusInstrument}
                                      >
                                        <i className='bi bi-plus-circle-fill' />
                                      </a>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='inputInfo'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Info
                        </label>
                        <div className='col-sm-9'>
                          <textarea
                            // onChange={onchange}
                            name='info'
                            type='textarea'
                            className='form-control'
                            id='inputInfo'
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='mb-3 row '>
                        <label
                          htmlFor='inputInfo'
                          className='col-sm-3 col-form-label d-flex justify-content-start'
                        >
                          Status
                        </label>
                        <div className='col-sm-9'>
                          <div className='form-check d-flex align-items-center'>
                            <input
                              //   onChange={() => handleCheck()}
                              className='form-check-input mt-0 me-2'
                              type='checkbox'
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

                  <div className='row'>
                    <label className='col-sm-3 col-form-label' />
                    <div className='col-sm-12'>
                      <button
                        type='submit'
                        className='btn btn-success px-5'
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: 'green',
                color: 'white',
              },
            },
            error: {
              style: {
                background: 'red',
                color: 'white',
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default AddNewInv;
