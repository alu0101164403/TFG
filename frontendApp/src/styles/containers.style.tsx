import {StyleSheet} from 'react-native';

const styleContainers = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerProfileTop: {
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
  },
  containerCoins: {
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  containerDataUser: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'flex-start',
  },
  containerRequest: {
    flex: 0.2,
    backgroundColor: '#D9D9D9',
    marginBottom: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    margin: 1,
  },
  containerHistory: {
    flex: 0.1,
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
    padding: 15,
    margin: 1,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
  },
  scroll: {
    flex: 1,
    paddingVertical: 50,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default styleContainers;
