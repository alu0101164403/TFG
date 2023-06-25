import * as React from 'react';
import {useContext, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {AuthContext} from '../../context/auth.context';
import styles from '../../styles';
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
        <View style={styles.stylesContainer.containerNav}>
          {/* HOME */}
          <TouchableOpacity
            style={styles.stylesBtm.btmNAV}
            onPress={() => navigation.navigate('Home')}>
            <Image
              style={styles.stylesImage.icon}
              source={require('../../assets/icons/homeicon.png')}
            />
          </TouchableOpacity>
          {/* FORM MODAL */}
          <TouchableOpacity
            style={styles.stylesBtm.btmNAV}
            onPress={() => setModalVisible(true)}>
            <Image
              style={styles.stylesImage.icon}
              source={require('../../assets/icons/plus.png')}
            />
            <ModalRequest visible={modalVisible} onClose={closeModal} />
          </TouchableOpacity>
          {/* PROFILE */}
          <TouchableOpacity
            style={styles.stylesBtm.btmNAV}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.stylesImage.icon}
              source={require('../../assets/icons/iconuser.png')}
            />
          </TouchableOpacity>
          {/* CHAT */}
          <TouchableOpacity
            style={styles.stylesBtm.btmNAV}
            /* onPress={() => navigation.navigate('ChatRoom')} */
          >
            <Image
              style={styles.stylesImage.icon}
              source={require('../../assets/icons/chaticon.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      {!isLoggedIn && (
        <View style={styles.stylesContainer.containerNav}>
          {/* LOGIN */}
          <TouchableOpacity
            style={styles.stylesBtm.btmNAV}
            onPress={() => navigation.navigate('Login')}>
            <Image
              style={styles.stylesImage.icon}
              source={require('../../assets/icons/iconuser.png')}
            />
          </TouchableOpacity>
          {/* REGISTER */}
          <TouchableOpacity
            style={styles.stylesBtm.btmNAV}
            onPress={() => navigation.navigate('Register')}>
            <Image
              style={styles.stylesImage.icon}
              source={require('../../assets/register.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default AppNavigator;
