//import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Blog from './components/Blog';
import CreatePost from './components/CreatePost';
import CreateSupplier from './components/CreateSupplier';
import CreateProduct from './components/CreateProduct';
import CreateThirdParty from './components/CreateThirdParty';
import BasicExample  from './components/Nav';
import Login from './auth/Login';
import Register from './auth/Register';
import Supplier from './components/supplier';
import Product from './components/product';
import ThirdParty from './components/thirdparty';
import UpdateSupplier from './components/UpdateSupplier';
import ContactPage from './components/ContactPage';
import UpdateProduct from './components/UpdateProduct';
 import UpdateThirdParty from './components/updatethirdparty';
// import Home from './components/Home';




function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <BasicExample/>
      <Routes>
      {/* <Route path='/' element={<Home/>} /> */}
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/create' element={<CreatePost />} />
        <Route path='/supplier/create-supplier' element={<CreateSupplier />} />
        <Route path='/product/create-product' element={<CreateProduct />} />
        <Route path='/thirdparty/create-thirdparty' element={<CreateThirdParty />} />
        {/* auth routes*/}
        <Route path='/auth/login' element={< Login />} />
        <Route path='/auth/register' element={< Register />} />
        <Route path='/supplier' element={< Supplier />} />
        <Route path='/product' element={< Product/>} /> 
        <Route path='/thirdparty' element={< ThirdParty/>} />
         {/* <Route path='/updatesupplier:supplier._id' element={<  UpdateSupplier />} /> */}
        <Route path='/updatesupplier/:id' element={<  UpdateSupplier />} />
        <Route path='/contactpage' element={< ContactPage />} />
        <Route path='/updateproduct/:id' element={<  UpdateProduct />} />
        <Route path='/updatethirdparty/:id' element={< UpdateThirdParty />} />

        

 
      



      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
