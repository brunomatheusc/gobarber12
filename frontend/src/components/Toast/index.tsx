import React, { FC } from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, ToastContainer } from './styles';
import { ToastMessage } from '../../helpers/toast';

interface ToastContainerProps {
	messages: ToastMessage[];
}

const Toast: FC<ToastContainerProps> = () => {
	return (
		<>
			<Container>
				<ToastContainer hasDescription>
					<FiAlertCircle />

					<div>
						<strong>Aconteceu um erro</strong>
						<p>Não foi possível fazer login na aplicação</p>
					</div>

					<button>
						<FiXCircle />
					</button>
				</ToastContainer>

				<ToastContainer hasDescription type="success">
					<FiAlertCircle />

					<div>
						<strong>Aconteceu um erro</strong>
						<p>Não foi possível fazer login na aplicação</p>
					</div>

					<button>
						<FiXCircle />
					</button>
				</ToastContainer>

				<ToastContainer hasDescription type="error">
					<FiAlertCircle />

					<div>
						<strong>Aconteceu um erro</strong>
						<p>Não foi possível fazer login na aplicação</p>
					</div>

					<button>
						<FiXCircle />
					</button>
				</ToastContainer>
			</Container>	
		</>
	);
};

export default Toast;