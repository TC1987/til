import React from 'react';
import { connect } from 'react-redux';

import { updateFilter } from '../../../reducers/filterReducer';
import styles from './filter.module.scss';

const Filter = ({ filter, updateFilter}) => {
	return (
		<input type="text" id="filter" value={ filter } onChange={ e => updateFilter(e.target.value) } className={ styles.filterField } placeholder="Search"></input>
	);
}

const mapStateToProps = state => {
	return {
		filter: state.filter
	}
};

const mapDispatchToProps = {
	updateFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);