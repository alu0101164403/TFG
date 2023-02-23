import {StyleSheet} from 'react-native';

const stylesText = StyleSheet.create({
  // welcome file
  title: {
    fontSize: 26,
    marginBottom: 100,
    color: '#6F6464',
  },
  titleBtm: {
    fontWeight: 'bold',
    color: '#ffff',
    fontSize: 18,
  },
  // login-register file
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  inputView: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#97E4FD',
    width: '90%',
    height: 50,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
});

export default stylesText;
