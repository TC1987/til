import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogReducer';
import messageReducer from './reducers/messageReducer';
import filterReducer from './reducers/filterReducer';
import sidebarReducer from './reducers/sidebarReducer';

const reducers = combineReducers({
	user: userReducer,
	blogs: blogsReducer,
	message: messageReducer,
	filter: filterReducer,
	isSidebarOpen: sidebarReducer 
});

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);