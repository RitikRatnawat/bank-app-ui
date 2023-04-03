import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginForm from "./components/Login/LoginForm"
import RegistrationForm from "./components/Registration/RegistrationForm"
import Transaction from "./components/Transaction/Transaction"
import DepositForm from "./components/Transaction/DepositForm"
import TransferForm from "./components/Transaction/TransferForm"
import Protected from './utils/Protected';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/register",
    element: <RegistrationForm />
  },
  {
    path: "/transaction",
    element: <Protected><Transaction /></Protected>
  },
  {
    path: "/deposit",
    element: <Protected><DepositForm /></Protected>
  },
  {
    path: "/transfer",
    element: <Protected><TransferForm /></Protected>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
