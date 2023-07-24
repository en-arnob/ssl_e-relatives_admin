import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RoleSetupCard from './RoleSetupCard';

const RolePermissionPage = () => {
  const [roles, setRoles] = useState([]);
  const getRolesData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/roles`)
      .then((response) => {
        const allData = response.data.data;

        setRoles(allData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRolesData();
  }, []);

  const [roleValue, setRoleValue] = useState(0);
  const selectRoleHandler = (e) => {
    setRoleValue(e.target.value);
    // console.log(e.target.value)
  };

  return (
    <div>
      <>
        <h6 className='mb-0 text-uppercase'>Setup Role Access Control</h6>
        <hr />
        <div className='row'>
          <div className='col-xl-12 mx-auto'>
            <div className='card'>
              <div className='card-body'>
                <div className='border row p-3 rounded '>
                  <div className='mb-3  '>
                    <div classname='col-sm'>
                      <label className='form-label h6 text-right'>Role</label>
                    </div>
                    <div className='input-group col-sm'>
                      <select
                        value={roleValue}
                        onChange={selectRoleHandler}
                        className='single-select form-select'
                      >
                        <option value={0}>Select a role</option>
                        {roles.map((role) => (
                          <option value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RoleSetupCard roles={roles} roleId={roleValue} />
      </>
    </div>
  );
};

export default RolePermissionPage;
