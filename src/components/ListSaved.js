import React from 'react';
import {Text, FlatList, StyleSheet, View, Button} from 'react-native';

import GlobalStyle from '../Style';

export default class ListSaved extends React.Component {
	render() {
		if (this.props.cities.length) {
			return (
				<View style={styles.viewCitiesSaved}>
					<Text style={GlobalStyle.title}>Cities saved</Text>
					<FlatList
						data={this.props.cities}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({item, index}) => (
							<View style={styles.buttonCitySaved}>
								<Button
									title={item}
									color={GlobalStyle.blue.color}
									onPress={() =>
										this.props.navigation.navigate('ResultList', {
											city: item.toLowerCase(),
											storage: this.props.storage,
											updateStorage: this.props.updateStorage,
										})
									}
								/>
							</View>
						)}
					/>
				</View>
			);
		} else {
			return null;
		}
	}
}

const styles = StyleSheet.create({
	viewCitiesSaved: {
		marginTop: 20,
	},
	buttonCitySaved: {
		marginBottom: 10,
	},
});
