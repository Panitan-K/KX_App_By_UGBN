import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import InvestorMain from './Routes/InvesetorMain';

import Err from './Routes/Err';
import Welcome from './Routes/Welcome';
import Register from './Routes/Register';
import Login from './Routes/Login';
import InvestList from './Routes/InvestList';
import StartupInfo from './Routes/StartupInfo';

const router = createBrowserRouter([

  {
    path: "/",
    errorElement: <Err />,
    element:  <Welcome/>,
  },
  {
    path: "/Register",
    errorElement:<Err/>,
    element:<Register/>
  },
  {
    path: "/InvestList",
    errorElement:<Err/>,
    element:<InvestList/>
  },
  {
    path: "/StartupInfo",
    errorElement:<Err/>,
    element:<StartupInfo/>
  },
  {
    path: "/Login",
    errorElement:<Err />,
    element:<Login/>
  },
  {
    path: "/InvestorMain",
    errorElement: <Err />,
    element:  <InvestorMain/>,
  },
  
  
  

]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


/*
// import reportWebVitals from './reportWebVitals';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/