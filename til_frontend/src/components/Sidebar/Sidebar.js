import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NavMenu from '../Header/NavMenu/NavMenu';
import { toggleSidebar, closeSidebar } from '../../reducers/sidebarReducer';
import styles from './sidebar.module.scss';

const Sidebar = props => {
	const ref = useRef();

	// this runs before which closes the sidebar regardless, and then the toggler opens it. that's why always open
	const handleMouseDown = e => {
		if (props.burgerRef.current.firstChild === e.target) {
			return;
		}
		if (ref.current && !ref.current.contains(e.target)) {
			props.closeSidebar();
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleMouseDown);
		
		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
		}
	})

	return (
		<div ref={ ref } className={ `${ styles.sidebar } ${ props.isOpen ? styles.show : null } ${ props.user ? styles.reducedWidth : null }`}>
			{ props.user ? 
				<NavMenu />
				:
				<div className={ styles.container }>
					<div className={ styles.text }>
						<h4 className={ styles.text__title }>Welcome to TIL</h4>
						<p className={ styles.text__content }>We're a community of aspiring developers sharing our knowledge and experience hoping that someone will walk away learning something new.</p>
					</div>
					<div className={ styles.buttons } onClick={ props.toggleSidebar }>
						<button className={ `${styles.button} ${styles.button___green}` }><Link to={'/login'} className={ styles.button__link }>Login</Link></button>
						<button className={ `${styles.button} ${styles.button___light}`}><Link to={'/register'} className={ styles.button__link }>Register</Link></button>
					</div>
				</div>
			}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		isOpen: state.isSidebarOpen,
		user: state.user
	}
}

const mapDispatchToProps = {
	toggleSidebar,
	closeSidebar
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);