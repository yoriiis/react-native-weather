import React from 'react';
import {TextInput, Button, View, Text, Keyboard} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import ResultList from '../components/ResultList';
import ListSaved from '../components/ListSaved';
import GlobalStyle from '../../Style';

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			city: null,
			storageCities: null,
		};

		this.init();
	}

	init = async () => {
		const currentStorage = await this.getData();
		this.setState({
			storageCities: currentStorage,
		});
	};

	setCity(city) {
		this.setState({city});
	}

	submit() {
		Keyboard.dismiss();

		if (this.state.city !== null) {
			this.props.navigation.navigate('ResultList', {city: this.state.city});
		}
	}

	getData = async () => {
		try {
			let datas = await AsyncStorage.getItem('cities');

			if (datas !== null) {
				datas = JSON.parse(datas);
			}

			return datas;
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		return (
			<View style={GlobalStyle.view}>
				<Text style={GlobalStyle.title}>Search a city</Text>
				<TextInput
					underlineColorAndroid="transparent"
					onSubmitEditing={() => this.submit()}
					onChangeText={text => this.setCity(text)}
					style={GlobalStyle.inputSearch}
					placeholder="e.g. Chicago"
					value={this.state.city}
				/>
				<Button
					onPress={() => this.submit()}
					title="Search"
					color={GlobalStyle.blue.color}
					style={GlobalStyle.button}
				/>
				<ListSaved cities={this.state.storageCities} navigation={this.props.navigation} />
			</View>
		);
	}
}

const navigationOptions = {
	headerStyle: GlobalStyle.header,
	headerTitleStyle: GlobalStyle.headerTitle,
	headerTintColor: '#fff',
};

const AppNavigator = createStackNavigator({
	Search: {
		screen: Search,
		navigationOptions,
	},
	ResultList: {
		screen: ResultList,
		navigationOptions,
	},
});

export default createAppContainer(AppNavigator);
