import React, { FC } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from './toast';

const AppProvider: FC = ({ children }) => {
	return (
		<>
			<AuthProvider>
				<ToastProvider>
					{ children }
				</ToastProvider>
			</AuthProvider>
		</>
	);
};

export default AppProvider;