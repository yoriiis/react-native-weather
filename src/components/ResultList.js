import React from 'react';
import {FlatList, Text} from 'react-native';
import {View} from 'native-base';
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import ResultRow from './ResultRow';
import ActionButton from './ActionButton';
import Style from '../Style';

moment.locale('us');

export default class List extends React.Component {
	static navigationOptions = ({navigation}) => {
		return {
			title: `Météo à ${navigation.state.params.city}`,
		};
	};

	constructor(props) {
		super(props);

		const city = this.props.navigation.state.params.city;
		const storage = this.props.navigation.state.params.storage;
		let isSaved = false;

		if (storage.includes(city)) {
			isSaved = true;
		}

		this.state = {
			city: city,
			datas: null,
			error: false,
			isLoading: true,
			isSaved: isSaved,
			storage: storage,
		};
		// this.init();
	}

	init() {
		this.clearStorage();
	}

	clearStorage = async () => {
		try {
			await AsyncStorage.removeItem('cities');
		} catch (e) {
			console.log(e);
		}
	};

	saveCity = async () => {
		try {
			if (!this.state.isSaved) {
				const newDatas = [this.state.city].concat(this.state.storage);
				await AsyncStorage.setItem('cities', JSON.stringify(newDatas), () => {
					this.setState({
						storage: newDatas,
						isSaved: true,
					});
					this.props.navigation.state.params.updateStorage(newDatas);
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	removeCity = async () => {
		const newDatas = this.state.storage;
		const indexCity = newDatas.findIndex(city => city === this.state.city);

		if (indexCity !== -1) {
			newDatas.splice(indexCity, 1);
		}

		await AsyncStorage.setItem('cities', JSON.stringify(newDatas), () => {
			this.setState({
				storage: newDatas,
				isSaved: false,
			});
			this.props.navigation.state.params.updateStorage(newDatas);
		});
	};

	componentDidMount() {
		return this.fetchWeather()
			.then(response => response.json())
			.then(responseJson => {
				this.setState({
					datas: responseJson,
					isLoading: false,
				});
				this.filterData();
			})
			.catch(() => {
				this.setState({error: true});
			});
	}

	filterData() {
		let listFiltered = [];
		let previousDay = null;
		this.state.datas.list.forEach(item => {
			let currentDay = new Date(item.dt * 1000).getDate();
			if (previousDay !== currentDay) {
				listFiltered.push(item);
			}
			previousDay = currentDay;
		});

		this.setState({
			listFiltered: listFiltered,
		});
	}

	fetchWeather() {
		return fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=e25bc782a6fea11b21661aaf0cd88bcb`,
		);
	}

	render() {
		if (this.state.isLoading) {
			return (
				<ActivityIndicator
					style={{flex: 1}}
					animating={true}
					color={Style.blue.color}
					size="large"
				/>
			);
		} else if (this.state.error) {
			return (
				<View style={{flex: 1, justifyContent: 'center'}}>
					<Text style={{textAlign: 'center'}}>An error occured</Text>
				</View>
			);
		} else {
			return (
				<View>
					<ActionButton
						isSaved={this.state.isSaved}
						update={
							this.state.isSaved
								? this.removeCity.bind(this)
								: this.saveCity.bind(this)
						}
					/>
					<FlatList
						data={this.state.listFiltered}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({item, index}) => <ResultRow day={item} index={index} />}
					/>
				</View>
			);
		}
	}
}
