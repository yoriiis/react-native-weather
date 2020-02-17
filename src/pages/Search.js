import React from 'react';
import {TextInput, Button, View, Text, Keyboard} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import List from '../components/List';
import Style from '../../Style';

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// city: null,
			city: 'Chicago',
		};
	}

	setCity(city) {
		this.setState({city});
	}

	submit() {
		Keyboard.dismiss();

		if (this.state.city !== null) {
			this.props.navigation.navigate('Result', {city: this.state.city});
		}
	}

	render() {
		return (
			<View style={Style.view}>
				<Text style={Style.title}>Search a city</Text>
				<TextInput
					underlineColorAndroid="transparent"
					onSubmitEditing={() => this.submit()}
					onChangeText={text => this.setCity(text)}
					style={Style.inputSearch}
					placeholder="e.g. Chicago"
					value={this.state.city}
				/>
				<Button
					onPress={() => this.submit()}
					title="Search"
					color={Style.blue.color}
					style={Style.button}
				/>
			</View>
		);
	}
}

const navigationOptions = {
	headerStyle: Style.header,
	headerTitleStyle: Style.headerTitle,
	headerTintColor: '#fff',
};
const AppNavigator = createStackNavigator({
	Search: {
		screen: Search,
		navigationOptions,
	},
	Result: {
		screen: List,
		navigationOptions,
	},
});

export default createAppContainer(AppNavigator);
