import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Doctor from './components/Signup doctor/Doctor.jsx';
import User from './components/Signup user/User.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Appointment from './components/Appointment/Appointment.jsx';
import GetAllDoc from './components/GetAllDoctor/GetAllDoc.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="Appointment" element={<Appointment />} />
      <Route path="Login" element={<Login />} />
      <Route path="Signup" element={<Signup />} />
      {/* <Route path="get-all-doc" element={<GetAllDoc />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
