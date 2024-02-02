import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'
import axios from '../config/axiosConfig';

export default function RequireAuth({ children }) {
  const [auth, setAuth] = useState(null);
  const isAuthenticatedUrl = import.meta.env.VITE_APP_BACKEND_URL + '/user/isauth';

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.post(isAuthenticatedUrl);
        setAuth(response?.data === true);
      } catch (error) {
        console.log(error);
        setAuth(false);
      }
    };

    checkAuthentication();
  }, []);

  //toast.error('Unauthorized')
  //before auth gets changed to false or true, we want to do nothing
  if (auth == null) {
    return <></>
  }

  return auth ? (
    children
  ) : (
    <>
      {/*<Toaster position='top-center'></Toaster>*/}
      <Navigate to="/" />
    </>
    
  );
}