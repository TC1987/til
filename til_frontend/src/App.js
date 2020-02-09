import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Users from './components/Users/Users';
import User from './components/User/User';
import Blog from './components/Blog/Blog';
import BlogEdit from './components/BlogEdit/BlogEdit';
import NewBlog from './components/NewBlog/NewBlog';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

import { user_login } from './reducers/userReducer';
import { blogs_init } from './reducers/blogReducer';

import { blogs_getAll } from './services/blogs';

const App = props => {
	const [burgerRef, setBurgerRef] = useState(null);

	useEffect(() => {
		let user = window.localStorage.getItem('user');
		// let token = window.localStorage.getItem('token');

		if (user) {
			props.user_login(JSON.parse(user));
		}

		blogs_getAll().then(blogs => {
			props.blogs_init(blogs);
		});
	}, []);

	return (
		<BrowserRouter>
			<div className={ styles.container }>
				<Header setBurgerRef={ setBurgerRef } />
				{ props.message ? <p className={ styles.message }>{ props.message }</p> : null }
				<div className={ `${ styles.main } ${ props.isOpen ? styles.fixedPosition : '' }` }>
					<Switch>
						<Route exact path='/' component={Dashboard} />
						<Route exact path='/users' component={Users} />
						<Route exact path='/blogs' component={Dashboard} />
						<Route exact path='/register' component={Register} />
						<Route path='/login' render={() => props.user ? <Redirect to='/' /> : <Login />} />
						<Route path='/blogs/new' render={routeProps => props.user ? <NewBlog {...routeProps} /> : <Redirect to='/' />} />
						<Route path='/users/:id' component={User} />
						<Route exact path='/blogs/:id/edit' component={BlogEdit} />
						<Route path='/blogs/:id' component={Blog} />
						<Route component={NotFound} />
					</Switch>
					<Sidebar burgerRef={ burgerRef } />
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user,
		isOpen: state.isSidebarOpen,
		message: state.message
	};
};

const mapDispatchToProps = {
	user_login,
	blogs_init
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
