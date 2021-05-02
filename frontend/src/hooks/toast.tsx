import React, { createContext, FC, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import Toast from '../components/Toast';
import { ToastMessage } from './../helpers/toast';

interface ToastContextData {
	addToast(message: Omit<ToastMessage, 'id'>): void;
	removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: FC = ({ children }) => {
	const [messages, setMessages] = useState<ToastMessage[]>([]);

	const addToast = useCallback((message: Omit<ToastMessage, 'id'>) => { 
		const id = uuid();

		const toast = { id, ...message};

		setMessages(oldMessages => [...oldMessages, toast]);
	}, []);

	const removeToast = useCallback((id: string) => { 
		setMessages(oldMessages => oldMessages.filter(message => message.id !== id));
	}, []);

	return (
		<>
			<ToastContext.Provider value={{ addToast, removeToast }}>
				{ children }
				
				<Toast messages={ messages }/>
			</ToastContext.Provider>
		</>	
	);
}

function useToast(): ToastContextData {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}

	return context;
}

export { ToastProvider, useToast };