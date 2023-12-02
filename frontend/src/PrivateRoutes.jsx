import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './Components/userPages/Auth';

function PrivateRoute({ element, ...rest }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace state={{ from: rest.location.pathname }} />
  );
}

export default PrivateRoute;