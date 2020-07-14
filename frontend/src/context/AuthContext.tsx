import React, { FC, createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
	email: string;
	password: string;
}

interface AuthContextData {
	name: string;
	signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: FC = ({ children }) => {
	const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
		const response = await api.post('/session', { email, password });

		console.log(response.data);
	}, []);

	return (
		<AuthContext.Provider value={{ name: 'Bruno', signIn }}>
			{ children }
		</AuthContext.Provider>
	);
}