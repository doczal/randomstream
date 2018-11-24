import React from 'react';
import '../styles/Button.scss';

const Button = ({ onClick, children, centered, fullWidth }) => (
  <button
    className={
      ["button",
       centered ? "centered" : '', 
      ].join(' ')}
    onClick={onClick}
  >
    { children }
  </button>
)

export default Button;