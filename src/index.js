import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';
import UserContext from './Context/UserContextAPI';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Toaster
      position='top-center'
      reverseOrder={false}
      gutter={8}
      containerClassName=''
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
        },

        // Default options for specific types
        // success: {
        //   duration: 3000,
        //   theme: {
        //     primary: 'green',
        //     secondary: 'black',
        //   },
        // },
        // error: {
        //   duration: 3000,
        //   theme: {
        //     primary: 'red',
        //     secondary: 'black',
        //   },
        // },
      }}
    />
    <UserContext>
      <App />
    </UserContext>
  </>
);
