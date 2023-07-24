import { RouterProvider } from 'react-router-dom';
import router from './Routers/Router';
import './index.css';

function App() {
  return (
    <>
      <div className='App'>{<RouterProvider router={router} />}</div>
    </>
  );
}

export default App;
