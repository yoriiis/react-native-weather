import React from 'react';
import {View, Text, Button} from 'react-native';

import Style from '../../Style';

export default class About extends React.Component {
	search() {
		this.props.navigation.navigate('Search');
	}

	render() {
		return (
			<View style={Style.view}>
				<Text style={Style.title}>A propos de l'application</Text>
				<Text style={{marginBottom: 20}}>
					Une application de découverte des applications mobiles, en services avec l'API
					openWeather
				</Text>
				<Button onPress={() => this.search()} title="Rechercher" style={Style.button} />
			</View>
		);
	}
}
