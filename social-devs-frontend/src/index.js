import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { DataContextProvider } from './contexts/DataContext';

ReactDOM.render(
	<Router>
		<DataContextProvider>
			<Route component={App} />
		</DataContextProvider>
	</Router>,
	document.getElementById('root')
);
