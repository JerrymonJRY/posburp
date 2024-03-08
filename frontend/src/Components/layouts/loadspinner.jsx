import React from 'react';
import TailSpin from 'react-spinner-loader';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-spinner-loader/3.0.0/loader/css/react-spinner-loader.css" />

const LoadingSpinner = () => {
  return (
    <TailSpin
    visible={true}
    height={80}
    width={80}
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius={1}
    wrapperStyle={{}} // You can specify custom styles here
    wrapperClassName="" // You can specify custom class name here
  />
  );
};

export default LoadingSpinner;
