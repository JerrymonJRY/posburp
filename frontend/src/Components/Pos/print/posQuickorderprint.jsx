import React from "react";
const PosQuickorderPrint = ({ quickentry }) => {
  return (
    <div ref={ref} className="p-5">
      <h1>React {quickentry.newEntry.ordernumber}</h1>
    
    </div>
  );
};

export default PosQuickorderPrint;
