// path: src/components/commonComponents/Button.jsx
import React from "react";
 import PropTypes from "prop-types";
const Button = ({ children, onClick, disabled}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      
      style={{
        padding: "10px",
        margin: "5px",
          backgroundColor: "#007bff",
         color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: disabled?"not-allowed": "pointer",
        opacity: disabled?0.6:1
      }}
    >
      {children}
    </button>
  );
};
Button.propTypes ={
    children:PropTypes.node.isRequired,
    onClick:PropTypes.func,
    disabled:PropTypes.bool,
   
};
Button.defaultProps ={
    onClick:()=>{},
    disabled:false,
   
};
export default Button;