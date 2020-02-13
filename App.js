import React from 'react';
import {StatusBar, View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

import About from './src/pages/About';
import Search from './src/pages/Search';

const Tabs = createBottomTabNavigator({
	Search: {screen: Search},
	About: {screen: About},
});

const AppContainer = createAppContainer(Tabs);

export default class App extends React.Component {
	render() {
		const AppNavigator = createAppContainer(AppContainer);
		return (
			<View style={{flex: 1}}>
				<StatusBar hidden={true} />
				<AppNavigator />
			</View>
		);
	}
}
