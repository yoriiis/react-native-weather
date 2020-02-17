import React from 'react';
import {Button} from 'react-native';

export default class ActionButton extends React.Component {
	render() {
		if (this.props.isSaved === true) {
			return (
				<Button
					title="Remove the city"
					onPress={() => {
						this.props.methodRemove();
					}}
					color="#22529c"
				/>
			);
		} else if (this.props.isSaved === false) {
			return (
				<Button
					title="Save the city"
					onPress={() => {
						this.props.methodSave();
					}}
					color="#22529c"
				/>
			);
		} else {
			return null;
		}
	}
}
