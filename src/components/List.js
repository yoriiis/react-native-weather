import React from 'react';
import {FlatList} from 'react-native';
import globalstyle from '../../Style';
import WeatherRow from './Row';
import {ActivityIndicator, Colors} from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import {View} from 'native-base';

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
			report: null,
			error: false,
		};
		this.fetchWeather();
	}

	fetchWeather() {
		const apiKey = 'e25bc782a6fea11b21661aaf0cd88bcb';
		const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${apiKey}`;
		axios
			.get(url)
			.then(response => {
				this.setState({report: response.data});
			})
			.catch(() => {
				this.setState({error: true});
			});
	}

	render() {
		if (this.state.report === null) {
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
						data={this.state.report.list}
						renderItem={({item}) => <WeatherRow day={item} />}
					/>
				</View>
			);
		}
	}
}
