import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import kelvinToCelsius from 'kelvin-to-celsius';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
	faSun,
	faCloud,
	faCloudShowersHeavy,
	faSnowflake,
	faBolt,
} from '@fortawesome/free-solid-svg-icons';
import 'moment/locale/fr';

import GlobalStyle from '../Style';

moment.locale('en');

export default class WeatherRow extends React.Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		day: PropTypes.object.isRequired,
		index: PropTypes.number,
	};

	icon(size = 50) {
		const type = this.props.day.weather[0].main.toLowerCase();
		let icon;

		switch (type) {
			case 'clouds':
				icon = faCloud;
				break;
			case 'rain':
				icon = faCloudShowersHeavy;
				break;
			case 'snow':
				icon = faSnowflake;
				break;
			case 'drizzle':
				icon = faCloudShowersHeavy;
				break;
			case 'thunderstorm':
				icon = faBolt;
				break;
			default:
				icon = faSun;
		}

		return <FontAwesomeIcon icon={icon} style={styles.iconWeather} size={35} />;
	}

	day() {
		let day = moment(this.props.day.dt * 1000)
			.format('ddd')
			.toUpperCase();
		return <Text>{day}</Text>;
	}

	date() {
		let day = moment(this.props.day.dt * 1000).format('DD/MM');
		return <Text>{day}</Text>;
	}

	render() {
		return (
			<View style={styles.listView}>
				<View style={styles.iconDate}>
					{this.icon()}

					<Text style={styles.date}>
						{this.day()} - {this.date()}
					</Text>
				</View>
				<View>
					<Text style={styles.temperature}>
						{Math.round(kelvinToCelsius(this.props.day.main.temp))}°C
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	listView: {
		backgroundColor: GlobalStyle.blue.color,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderBottomColor: '#0d274f',
		borderWidth: 1,
		borderTopWidth: 0,
	},
	iconWeather: {
		color: '#fff',
	},
	iconDate: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	temperature: {
		color: '#fff',
		fontSize: 25,
		fontWeight: 'bold',
	},
	date: {
		color: '#fff',
		marginLeft: 10,
		fontSize: 15,
		opacity: 0.8,
	},
});
