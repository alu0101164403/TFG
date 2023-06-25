/* eslint-disable prettier/prettier */
import {Image} from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from '../../styles';
import {AuthContext} from '../../context/auth.context';
import Components from '../';
import { RequestDataReceive, RequestService } from '../../services/request.services';
import { NavigationProp, ParamListBase } from '@react-navigation/native';


const UserPerfil = ({navigation}: { navigation: NavigationProp<ParamListBase> }) => {
  const {user, logout} = useContext(AuthContext);
  const [allRequest, setAllRequest] = useState<RequestDataReceive[]>([]);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  let countRequests = 0, countOfferts = 0;

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
    }
  }, [navigation, user]);

  useEffect(() => {
    if (user) {
      RequestService.getRequestsUser(user.id).then(data => {
        setAllRequest(data.data);
      }).catch(err => {
        return err;
      });
    } else {
      console.log('No hay usuarios autenticados');
    }
  }, [user]);

  const count = () => {
    countRequests = 0;
    countOfferts = 0;
    allRequest.forEach((request) => {
      if (request) {
        request.type === 'offer' ? countOfferts++ : countRequests++;
      }
    });
  };

  if (allRequest.length > 0) {count();}

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  if (!user) {
    return null; // Evita renderizar el contenido del perfil si no hay usuario autenticado
  }

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
          <TouchableOpacity>
            <Text style={styles.stylesText.textProfileRequest}>Solicitudes activas</Text></TouchableOpacity>
          <Text style={styles.stylesText.textNumberProfile}>{countOfferts}</Text>
          <TouchableOpacity>
            <Text style={styles.stylesText.textProfileRequest}>Peticiones activas</Text></TouchableOpacity>
          <Text style={styles.stylesText.textNumberProfile}>{countRequests}</Text>
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
      {/* <ModalRequest visible={modalVisible} onClose={closeModal} /> */}
    </View>
    <Components.AppNavigator navigation={navigation} /></>
  );
};

export default UserPerfil;
