import React, { useState } from 'react';
import Button from '../../components/Button/Button';

const Toggler = props => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<>
			<div style={ visible ? { display: 'none' } : { display: '' } }>
				<Button label={ props.buttonLabel } onClick={ toggleVisibility } />
			</div>

			<div style={ visible ? { display: '' } : { display: 'none' }}>
				{ props.children }
				<Button label="Cancel" onClick={ toggleVisibility } />
			</div>
		</>
	);
};

export default Toggler;