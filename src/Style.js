import {StyleSheet} from 'react-native';

let mainColor = '#133467';

export default StyleSheet.create({
	blue: {
		color: '#133467',
	},
	button: {
		backgroundColor: mainColor,
		color: '#fff',
		borderRadius: 10,
		margin: 40,
		padding: 5,
	},
	view: {
		margin: 20,
		flex: 1,
	},
	title: {
		fontSize: 22,
		marginBottom: 20,
		textAlign: 'center',
	},
	header: {
		backgroundColor: mainColor,
	},
	headerTitle: {
		color: '#FFF',
	},
});
