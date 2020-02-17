import React from 'react';
import {FlatList} from 'react-native';
import {View} from 'native-base';
import {ActivityIndicator, Colors} from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import WeatherRow from './Row';
import ActionButton from './ActionButton';
import Style from '../../Style';

moment.locale('us');

export default class List extends React.Component {
	static navigationOptions = ({navigation}) => {
		return {
			title: `Météo à ${navigation.state.params.city}`,
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			city: this.props.navigation.state.params.city,
			datas: null,
			error: false,
			isLoading: true,
			storageCities: [],
			isSaved: null,
		};
		this.init();
	}

	init = async () => {
		// this.clearStorage();
		const currentStorage = await this.getData();
		console.log('currentStorage', currentStorage);

		this.setState({
			isSaved: currentStorage.includes(this.state.city),
		});
	};

	clearStorage = async () => {
		try {
			await AsyncStorage.removeItem('cities');
			console.log('Storage clear.');
		} catch (e) {
			console.log(e);
		}
	};

	saveCity = async () => {
		console.log('-----------------');
		try {
			let currentDatas = (await this.getData()) || [];
			let newDatas = [this.state.city];
			let mergeDatas = [];

			if (Array.isArray(currentDatas) && !currentDatas.includes(this.state.city)) {
				console.log('merged');
				mergeDatas = newDatas.concat(currentDatas);
				// newDatas = currentDatas;
			}
			console.log('currentDatas', currentDatas);
			console.log('newDatas', newDatas);
			console.log('mergeDatas', mergeDatas);

			await AsyncStorage.setItem('cities', JSON.stringify(mergeDatas), () => {
				this.setState({
					storageCities: mergeDatas,
				});
				this.setState({
					isSaved: true,
				});
				console.log('save ok');
			});
		} catch (e) {
			console.log(e);
		}
	};

	removeCity = async () => {
		const cities = this.state.storageCities;
		const indexCity = cities.findIndex(city => city === this.state.city);

		if (indexCity !== -1) {
			cities.splice(indexCity, 1);
		}

		await AsyncStorage.setItem('cities', JSON.stringify(cities), () => {
			this.setState({
				storageCities: cities,
			});
			this.setState({
				isSaved: false,
			});
			console.log('city removed', cities);
		});
	};
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
				this.props.navigation.navigate('Search');
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
					style={Style.Indicator}
					animating={true}
					color={Colors.white800}
					size="large"
				/>
			);
		} else {
			return (
				<View>
					<ActionButton
						isSaved={this.state.isSaved}
						methodSave={this.saveCity.bind(this)}
						methodRemove={this.removeCity.bind(this)}
					/>
					<FlatList
						data={this.state.listFiltered}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({item, index}) => <WeatherRow day={item} index={index} />}
					/>
				</View>
			);
		}
	}
}
