import React from 'react';
import classes from './Button.module.css'


const Button = ({mode, children, ...props}) => {
  	return (
		mode === 'fill'
			?
			<button {...props} className={classes.BtnFill}>
				{children}
			</button>
			:
			<button {...props} className={classes.BtnOutline}>
				{children}
			</button>
  	);
}

export default Button;