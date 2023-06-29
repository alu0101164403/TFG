import {StyleSheet} from 'react-native';

const stylesBtm = StyleSheet.create({
  btmSinBorde: {
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  containerBtm: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btmWelcome: {
    backgroundColor: '#E47272',
    borderRadius: 30,
    width: 200,
    height: 60,
    marginBottom: 20,
  },
  btmExplore: {
    backgroundColor: '#A19E9D',
    borderRadius: 30,
    width: 200,
    height: 60,
    marginTop: 50,
  },
  forgot_button: {
    height: 30,
    marginBottom: 20,
  },
  btmConBorde: {
    width: '50%',
    borderRadius: 30,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    backgroundColor: '#E47272',
  },
  /* btmSinBorde: {
    width: '50%',
    borderRadius: 30,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E47272',
  }, */
  btmTouchableCoins: {
    flexDirection: 'row',
  },
  btmModalRequest: {
    width: '40%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E47272',
  },
  btmNAV: {
    marginRight: 20,
    marginLeft: 20,
  },
  textDataUser: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textProfileRequest: {
    fontSize: 16,
    flex: 1,
  },
  textNumberProfile: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default stylesBtm;
