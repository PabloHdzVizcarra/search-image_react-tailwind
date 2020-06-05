import React from 'react'
import PropTypes from 'prop-types';

const Error = ({message}) => {
  return (
    <p className="alert alert-danger text-center my-3" role="alert">
      {message}
    </p>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error
