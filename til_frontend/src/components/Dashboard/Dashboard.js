import React from 'react';
import { connect } from 'react-redux';

import Blogs from '../BlogList/BlogList';

import styles from './dashboard.module.scss';

const Dashboard = props => {
	return (
		<Blogs />
	);
};

const mapStateToProps = state => {
	return {
		message: state.message
	};
};

export default connect(mapStateToProps)(Dashboard);