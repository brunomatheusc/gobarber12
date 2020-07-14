import React, { FC, ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, ...rest}) => {
	return (
		<>
			<Container { ...rest }>{ children }</Container>	
		</>
	);
};


export default Button;