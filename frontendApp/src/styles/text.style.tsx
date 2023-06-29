import {StyleSheet} from 'react-native';

const stylesText = StyleSheet.create({
  // welcome file
  /* title: {
    fontSize: 26,
    marginBottom: 100,
    color: '#6F6464',
    textAlign: 'center',
  }, */
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  textProfileRequest: {
    fontSize: 16,
    color: 'black',
  },
  textProfileOptons: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  textNumberProfileOptions: {
    fontSize: 16,
    marginRight: 15,
    color: 'black',
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
    color: 'black',
  },
  textNumberProfile: {
    fontSize: 14,
    color: 'black',
  },
  textDate: {
    fontSize: 12,
    color: 'gray',
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
  textRequestTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 15,
  },
  textRequestDescription: {
    fontSize: 12,
    color: 'black',
    marginHorizontal: 15,
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
