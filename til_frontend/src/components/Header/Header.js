import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '@animated-burgers/burger-squeeze/dist/styles.css';
import Burger from '@animated-burgers/burger-squeeze';

import Filter from './Filter/Filter';
import { toggleSidebar } from '../../reducers/sidebarReducer';
import styles from './header.module.scss';

const Header = props => {
	const ref = useRef();

	useEffect(() => {
		props.setBurgerRef(ref);
	}, [])

	return (
		<header className={ styles.header }>
			<div className={ styles.container }>
				<div className={ styles.logo }><Link to='/' className={ styles.link }>TIL</Link></div>
				<Filter />
				<div ref={ ref } className={ props.user ? styles.menu : styles.menu__responsive }>
					<Burger className={ styles.menu__burger } isOpen={ props.isOpen } onClick={ props.toggleSidebar } />
				</div>
				<nav className={ props.user ? styles.hide : styles.nav }>
					<Link to={ '/login' } className={ styles.button__link }>Login</Link>
					<Link to={ '/register' } className={ styles.button__link }>Register</Link>
				</nav>
				
			</div>
		</header>
	)
}

const mapStateToProps = state => {
	return {
		isOpen: state.isSidebarOpen,
		user: state.user
	}
}

const mapDispatchToProps = {
	toggleSidebar
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
