import React from 'react';
import {TextInput, Image, Button, View, Text} from 'react-native';
import axios from 'axios';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import List from '../components/List';

import Style from '../../Style';

class Search extends React.Component {
	static navigationOptions = {
		title: 'Rechercher une ville',
		tabBarIcon: () => {
			return (
				<Image
					source={require('../components/icons/smartphone.png')}
					style={{width: 20, height: 20}}
				/>
			);
		},
	};

	constructor(props) {
		super(props);

		this.state = {
			city: 'Nantes',
			searchCity: '',
			report: null,
			request: false,
		};
	}

	setCity(city) {
		this.setState({city});
	}

	submit() {
		this.props.navigation.navigate('Result', {city: this.state.city});
	}

	fetchWeather() {
		axios
			.get(
				`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&APPID=1ae0e05d29e5676b5e6ae70a74f6fef2`,
			)
			.then(response => {
				this.setState({report: response.data, request: true, city: ''});
			});
	}

	render() {
		return (
			<View style={Style.view}>
				<Text style={Style.title}>Rechercher votre ville</Text>
				<TextInput
					underlineColorAndroid="transparent"
					onChangeText={text => this.setCity(text)}
					style={Style.inputSearch}
					value={this.state.city}
				/>
				<Button
					onPress={() => this.submit()}
					title="Rechercher"
					color="red"
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
