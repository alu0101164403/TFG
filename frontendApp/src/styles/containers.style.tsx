import {StyleSheet} from 'react-native';

const styleContainers = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInfo: {
    backgroundColor: '#ffff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
  },
  containerTitle: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    with: 150,
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
    backgroundColor: '#f0ffff',
    marginBottom: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    margin: 1,
  },
  containerHistory: {
    flex: 1,
    backgroundColor: '#f0ffff',
    borderColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
    padding: 5,
    borderRadius: 20,
    height: 80,
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
  containerNav: {
    flex: 0.1,
    backgroundColor: '#E47272',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
//5F9EA0
export default styleContainers;
