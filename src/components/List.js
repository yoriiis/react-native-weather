import React from 'react';
import {FlatList} from 'react-native';
import {View} from 'native-base';
import {ActivityIndicator, Colors} from 'react-native-paper';
import moment from 'moment';

import WeatherRow from './Row';
import globalstyle from '../../Style';

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
		};
	}

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
					style={globalstyle.Indicator}
					animating={true}
					color={Colors.white800}
					size="large"
				/>
			);
		} else {
			return (
				<View style={{backgroundColor: '#263238'}}>
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
