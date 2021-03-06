import React from 'react';
import { useSelector } from 'react-redux';
import { Route as R, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Default from '../layouts/Default';
import Auth from '../layouts/Auth';

function Route({ auth, component: Component, ...restOfProps }) {
  const signed = useSelector((state) => state.auth.signed);

  if (signed && !auth) {
    return <Redirect to="/materials" />;
  }

  if (!signed && auth) {
    return <Redirect to="/" />;
  }

  const Layout = auth ? Auth : Default;

  return (
    <R
      {...restOfProps}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

Route.defaultProps = {
  auth: false,
};

Route.propTypes = {
  auth: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

export default Route;
