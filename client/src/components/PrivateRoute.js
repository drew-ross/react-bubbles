import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem('token')) {
          return { ...children };
        } else {
          return <Redirect to='/' />;
        }
      }}
    />
  );
};

export default PrivateRoute;