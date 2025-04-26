import React from "react";

const Loader = ({ className }) => {
  return (
    <div className={`spinner-border animate-spin ${className}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
