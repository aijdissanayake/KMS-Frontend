import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout from 'layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Switch>
						<Route path={`/admin`} component={AdminLayout} />
						<Redirect from='/' to='/admin/data-tables' />
						<Redirect from='/' to='/admin/employee-type' />
						<Redirect from='/' to='/industry' />
						<Redirect from='/' to='/admin/project-category' />
						<Redirect from='/' to='/industry' />
						<Redirect from='/' to='/admin/project' />
					</Switch>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
