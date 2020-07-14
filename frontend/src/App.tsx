import React from 'react';

import GlobalStyle from './styles/global';
import Routes from './routes/index';
import { AuthProvider } from './context/AuthContext';

function App() {
	return (
		<>
			<AuthProvider>
				<Routes />
			</AuthProvider>
			
			<GlobalStyle />
		</>
	);
}

export default App;