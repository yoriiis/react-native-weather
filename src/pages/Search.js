import React from 'react';
import {StyleSheet, TextInput, Button, View, Text, Keyboard} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import ResultList from '../components/ResultList';
import ListSaved from '../components/ListSaved';

import GlobalStyle from '../Style';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: null,
			storage: null,
			isLoading: true,
			inputError: false,
		};

		this.init();
	}

	init = async () => {
		const currentStorage = (await this.getData()) || [];
		this.setState({
			storage: currentStorage,
			isLoading: false,
		});
	};

	setCity(city) {
		this.setState({
			city: city.toLowerCase(),
		});
	}

	updateStorage(newStorage) {
		this.setState({
			storage: newStorage,
		});
	}

	submit() {
		Keyboard.dismiss();

		if (this.state.city) {
			this.setState({
				inputError: false,
			});
			this.props.navigation.navigate('ResultList', {
				city: this.state.city.toLowerCase(),
				storage: this.state.storage,
				updateStorage: this.updateStorage.bind(this),
			});
		} else {
			this.setState({
				inputError: true,
			});
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
		if (this.state.isLoading) {
			return (
				<ActivityIndicator
					style={{flex: 1}}
					animating={true}
					color={GlobalStyle.blue.color}
					size="large"
				/>
			);
		} else {
			return (
				<View style={GlobalStyle.view}>
					<Text style={GlobalStyle.title}>Search a city</Text>
					<TextInput
						underlineColorAndroid="transparent"
						onSubmitEditing={() => this.submit()}
						onChangeText={text => this.setCity(text)}
						style={[styles.inputSearch, this.state.inputError ? styles.inputError : '']}
						placeholder="e.g. Chicago"
						value={this.state.city}
					/>
					<Button
						onPress={() => this.submit()}
						title="Search"
						color={GlobalStyle.blue.color}
						style={GlobalStyle.button}
					/>
					<ListSaved
						cities={this.state.storage}
						navigation={this.props.navigation}
						storage={this.state.storage}
						updateStorage={this.updateStorage.bind(this)}
					/>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	inputSearch: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 10,
		marginBottom: 20,
		width: '100%',
	},
	inputError: {
		borderColor: 'red',
	},
});

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
