import * as React from 'react';
import {useContext, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {AuthContext} from '../../context/auth.context';
import ModalRequest from './modal';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

function AppNavigator({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const {isLoggedIn} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {isLoggedIn && (
        <View style={styles.containerNav}>
          {/* HOME */}
          <TouchableOpacity
            style={styles.btmNAV}
            onPress={() => navigation.navigate('Home')}>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/homeicon.png')}
            />
          </TouchableOpacity>
          {/* FORM MODAL */}
          <TouchableOpacity
            style={styles.btmNAV}
            onPress={() => setModalVisible(true)}>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/plus.png')}
            />
            <ModalRequest visible={modalVisible} onClose={closeModal} />
          </TouchableOpacity>
          {/* SHOP */}
          <TouchableOpacity
            style={styles.btmNAV}
            onPress={() => navigation.navigate('Shop')}>
            <Image
              style={styles.icon}
              source={require('../../assets/shop.png')}
            />
          </TouchableOpacity>
          {/* PROFILE */}
          <TouchableOpacity
            style={styles.btmNAV}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/iconuser.png')}
            />
          </TouchableOpacity>
          {/* CHAT */}
          <TouchableOpacity
            style={styles.btmNAV}
            /* onPress={() => navigation.navigate('ChatRoom')} */
          >
            <Image
              style={styles.icon}
              source={require('../../assets/icons/chaticon.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      {!isLoggedIn && (
        <View style={styles.containerNav}>
          {/* LOGIN */}
          <TouchableOpacity
            style={styles.btmNAV}
            onPress={() => navigation.navigate('Login')}>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/iconuser.png')}
            />
          </TouchableOpacity>
          {/* SHOP */}
          <TouchableOpacity
            style={styles.btmNAV}
            onPress={() => navigation.navigate('Shop')}>
            <Image
              style={styles.icon}
              source={require('../../assets/shop.png')}
            />
          </TouchableOpacity>
          {/* REGISTER */}
          <TouchableOpacity
            style={styles.btmNAV}
            onPress={() => navigation.navigate('Register')}>
            <Image
              style={styles.icon}
              source={require('../../assets/register.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* Separador */}
      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  containerNav: {
    flex: 0.1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#DCDCDC',
    borderWidth: 1,
  },
  icon: {
    width: 35,
    height: 35,
  },
  btmNAV: {
    marginRight: 20,
    marginLeft: 20,
  },
  separator: {
    width: Dimensions.get('window').width,
    height: 1,
    backgroundColor: 'gray',
  },
});

export default AppNavigator;
