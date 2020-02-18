import React from 'react';
import {Button} from 'react-native';

export default class ActionButton extends React.Component {
	render() {
		return (
			<Button
				title={`${this.props.isSaved === false ? 'Save' : 'Remove'} the city`}
				onPress={() => {
					this.props.update();
				}}
				color="#22529c"
			/>
		);
	}
}
