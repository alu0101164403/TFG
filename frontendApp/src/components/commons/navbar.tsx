import * as React from 'react';
import {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import styles from '../../styles';
import ModalRequest from './modal';

function AppNavigator({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
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
        onPress={() => navigation.navigate('Register')}>
        <Image
          style={styles.stylesImage.icon}
          source={require('../../assets/icons/chaticon.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default AppNavigator;
