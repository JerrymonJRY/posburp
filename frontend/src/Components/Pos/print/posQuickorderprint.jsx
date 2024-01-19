import React, { forwardRef } from 'react';

const PrintComponent = forwardRef(({ data }, ref) => {
  // Your print component content using the props.data

  console.log('PrintComponent Data:', data);
  return (
    <div ref={ref}>
      {/* Access data as needed */}
      <h1>Efff</h1>
      {/* ... */}
    </div>
  );
});

export default PrintComponent;

