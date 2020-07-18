import React, { FC } from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';
import { ToastMessage } from '../../helpers/toast';
import { useToast } from '../../hooks/toast';
import ToastContainer from './Container';

interface ToastContainerProps {
	messages: ToastMessage[];
}

const Toast: FC<ToastContainerProps> = ({ messages }) => {
	const { removeToast } = useToast();
	const messageWithTransitions = useTransition(
		messages, 
		message => message.id, 
		{ from: { right: '-120%', opacity: 0 }, enter: { right: '0%', opacity: 1 }, leave: { right: '-120%', opacity: 0 }}
	);

	return (
		<>
			<Container>
			{ messageWithTransitions.map(({ item, key, props }) => (
				<ToastContainer key={ key } style={ props } message={ item }/>
			))}
			</Container>	
		</>
	);
};

export default Toast;