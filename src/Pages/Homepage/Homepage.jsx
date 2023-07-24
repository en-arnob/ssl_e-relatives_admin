import axios from 'axios';
import { useEffect, useState } from 'react';
import './Homepage.scss';

const Homepage = () => {
  const settingURL = `${process.env.REACT_APP_API_BASE_URL}/settings`;

  const [data, setData] = useState({});
  const [vatId, setVatId] = useState(0);

  const getData = () => {
    axios
      .get(settingURL)
      .then((response) => {
        const allData = response.data.data[0];
        // console.log(allData);
        setData(allData);
        setVatId(allData.vat_type);
        // formData.append('name', data.name)
        // console.log(formData)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    // setUpData({...upData, [data.key] : data.value})
  }, []);

  return (
    <>
      <div className='card'>
        {/* <!--start content--> */}
        <main>
          <div className='container-fluid'>
            <div className='d-flex align-items-center justify-content-center py-5'>
              <div className='row g-0'>
                <div className='p-2 text-center'>
                  <h2 className='mt-2' style={{ color: '#3461ff' }}>
                    {data?.website_name}
                  </h2>
                  <p className='mt-2'>{data?.address}</p>
                  <p className='contact'>{data?.mobile}</p>
                </div>
              </div>
              {/*end row*/}
            </div>
          </div>
        </main>
      </div>

      {/* <div className='row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-4'>
        <div className='col'>
          <div className='card radius-10'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div>
                  <p className='mb-0 text-secondary'>Total Orders</p>
                  <h4 className='my-1'>4805</h4>
                  <p className='mb-0 font-13 text-success'>
                    <i className='bi bi-caret-up-fill' /> 5% from last week
                  </p>
                </div>
                <div className='widget-icon-large bg-gradient-purple text-white ms-auto'>
                  <i className='bi bi-basket2-fill' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card radius-10'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div>
                  <p className='mb-0 text-secondary'>Total Revenue</p>
                  <h4 className='my-1'>$24K</h4>
                  <p className='mb-0 font-13 text-success'>
                    <i className='bi bi-caret-up-fill' /> 4.6 from last week
                  </p>
                </div>
                <div className='widget-icon-large bg-gradient-success text-white ms-auto'>
                  <i className='bi bi-currency-exchange' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card radius-10'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div>
                  <p className='mb-0 text-secondary'>Total Customers</p>
                  <h4 className='my-1'>5.8K</h4>
                  <p className='mb-0 font-13 text-danger'>
                    <i className='bi bi-caret-down-fill' /> 2.7 from last week
                  </p>
                </div>
                <div className='widget-icon-large bg-gradient-danger text-white ms-auto'>
                  <i className='bi bi-people-fill' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card radius-10'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div>
                  <p className='mb-0 text-secondary'>Bounce Rate</p>
                  <h4 className='my-1'>38.15%</h4>
                  <p className='mb-0 font-13 text-success'>
                    <i className='bi bi-caret-up-fill' /> 12.2% from last week
                  </p>
                </div>
                <div className='widget-icon-large bg-gradient-info text-white ms-auto'>
                  <i className='bi bi-bar-chart-line-fill' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Homepage;
