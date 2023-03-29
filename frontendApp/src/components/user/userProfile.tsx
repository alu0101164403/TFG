/* eslint-disable prettier/prettier */
import {Image} from '@rneui/base';
import React, { useContext } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from '../../styles';
import {AuthContext} from '../../context/auth.context';
import Components from '../';


const UserPerfil = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <><View style={styles.stylesContainer.container}>
      <View style={styles.stylesContainer.containerProfileTop}>
        <Image style={styles.stylesImage.profileImageUser} source={require('../../assets/userPerfil.png')} />
        <View style={styles.stylesContainer.containerDataUser}>
          <Text style={styles.stylesText.textDataUser}>{user.username}</Text>
          <Text style={styles.stylesText.textDataUser}>{user.email}</Text>
          <Text>Number starts</Text>
        </View>
      </View>
      <View style={styles.stylesContainer.containerCoins}>
        <TouchableOpacity style={styles.stylesBtm.btmTouchableCoins} onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.stylesText.text}>Mi cartera</Text>
          <Text style={styles.stylesText.textNumberProfile}>{user.wallet.coins}</Text>
          <Image style={{ width: 20, height: 20 }} source={require('../../assets/logoSFtfg.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.stylesContainer.container}>
        <View style={styles.stylesContainer.containerRequest}>
          <Text style={styles.stylesText.textProfileRequest}>Respuestas solicitudes</Text>
          <Text style={styles.stylesText.textNumberProfile}>3</Text>
          <Text style={styles.stylesText.textProfileRequest}>Respuestas peticiones</Text>
          <Text style={styles.stylesText.textNumberProfile}>0</Text>
        </View>
        <View style={styles.stylesContainer.containerRequest}>
          <Text style={styles.stylesText.textProfileRequest}>Solicitudes activas</Text>
          <Text style={styles.stylesText.textNumberProfile}>1</Text>
          <Text style={styles.stylesText.textProfileRequest}>Peticiones activas</Text>
          <Text style={styles.stylesText.textNumberProfile}>0</Text>
        </View>

        <View style={styles.stylesContainer.containerProfileTop}>
          <TouchableOpacity style={styles.stylesBtm.btmSinBorde} onPress={() => navigation.navigate('Home')}>
            <Text>Cenjear monedas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stylesBtm.btmSinBorde} onPress={() => handleLogout()}>
            <Text>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View><Components.AppNavigator navigation={navigation} /></>
  );
};

export default UserPerfil;
