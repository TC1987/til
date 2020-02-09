import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	width: 100px;
	font-size: 1.2rem;
	font-weight: 700;
	text-transform: uppercase;
	background-color: #ccc;
	align-self: stretch;
`

const Button = ({ label, onClick }) => {
	return (
		<StyledButton onClick={ onClick }>{ label }</StyledButton>
	);
};

export default Button;