import {StyleSheet} from 'react-native';

const styleContainers = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHistory2: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  requestIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  requestDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerInfo: {
    backgroundColor: '#ffff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
  },
  requestInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  /* containerTitle: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    with: 150,
  }, */
  containerTitle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerProfileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerDataUser: {
    marginLeft: 10,
  },
  containerCoins: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  containerRequest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /*   containerHistory: {
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
  }, */
  containerHistory: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
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

export default styleContainers;
