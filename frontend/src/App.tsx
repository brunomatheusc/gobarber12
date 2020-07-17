import React from 'react';

import GlobalStyle from './styles/global';
import Routes from './routes/index';
import AppProvider from './hooks/index';

function App() {
	return (
		<>
			<AppProvider>
				<Routes />
			</AppProvider>
			
			<GlobalStyle />
		</>
	);
}

export default App;