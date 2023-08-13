import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register';
import Admin from './components/Admin';
import Supplier from './components/Supplier';
import NotFound from './components/NotFound';
import Dashbord from './components/Admin/Dashbord';
import Profile from './components/Admin/Profile';
import AdminSupplier from './components/Admin/Supplier'
import Clients from './components/Admin/Clients';
import AddClient from './components/Supplier/AddClient'
import Notification from './components/Admin/Notification';
import SupplierClient from './components/Supplier/Clients';
import AddSupplier from './components/Admin/AddSupplier';
import { MyContextProvider } from './components/Context/MyContext';

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} >
            <Route path="" element={<Dashbord />} />
            <Route path="dashbord" element={<Dashbord />} />
            <Route path='supplier' element={<AdminSupplier />} />
            <Route path='clients' element={<Clients />} />
            <Route path='notification' element={<Notification />} />
            <Route path='profile' element={<Profile/>} />
          </Route>
          <Route path="/supplier" element={<Supplier />} >
            <Route path='' element={<AddClient />} />
            <Route path='addclient' element={<AddClient />} />
            <Route path='clients' element={<SupplierClient />} />
          </Route>
          <Route path='addsupllier' element={<AddSupplier />} />
          <Route path="*" element={<NotFound />} />


        </Routes>
      </Router>
    </MyContextProvider>
  );
}

export default App;
