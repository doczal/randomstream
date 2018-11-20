import React from 'react';
import styles from '../styles/Button.module.scss';

const Button = ({ onClick, children, centered }) => (
  <button
    className={
      [styles.button,
       centered ? styles.centered : '', 
      ].join(' ')}
    onClick={onClick}
  >
    { children }
  </button>
)

export default Button;