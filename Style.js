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
	},
	title: {
		fontSize: 22,
		marginBottom: 20,
		textAlign: 'center',
	},
	inputSearch: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 10,
		marginBottom: 20,
		width: '100%',
	},
	header: {
		backgroundColor: mainColor,
	},
	headerTitle: {
		color: '#FFF',
	},
	container: {
		flex: 1,
		backgroundColor: '#eee',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
