import {StyleSheet} from 'react-native';

const stylesText = StyleSheet.create({
  // welcome file
  title: {
    fontSize: 26,
    marginBottom: 100,
    color: '#6F6464',
    textAlign: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 8,
    width: '100%',
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
  textProfileRequest: {
    flex: 0.5,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 15,
    textAlign: 'left',
  },
  textNumberProfile: {
    fontSize: 16,
    marginHorizontal: 15,
    color: 'grey',
    fontWeight: 'bold',
  },
  textDataUser: {
    fontSize: 20,
    color: 'grey',
    fontWeight: 'bold',
    alignContent: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    alignContent: 'flex-start',
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
  inputViewDisable: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    width: '90%',
    height: 50,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  textArea: {
    width: '90%',
    height: 120,
    borderWidth: 1,
    borderColor: '#97E4FD',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default stylesText;
