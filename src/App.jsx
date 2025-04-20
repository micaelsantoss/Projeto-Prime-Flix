import './App.css';
import RoutesApp from './routes.jsx'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

<ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  style={{ zIndex: 9999 }} 
/>

function App() {
  return (
    <div className='App'>
      <ToastContainer autoClose={3000}/>
      <RoutesApp/>
    </div>
  )
}

export default App;
