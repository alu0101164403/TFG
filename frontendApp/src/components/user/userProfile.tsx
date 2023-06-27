/* eslint-disable prettier/prettier */
import {Image} from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import styles from '../../styles';
import {AuthContext} from '../../context/auth.context';
import Components from '../';
import { RequestDataReceive, RequestService } from '../../services/request.services';
import { NavigationProp, ParamListBase } from '@react-navigation/native';


const UserPerfil = ({navigation}: { navigation: NavigationProp<ParamListBase> }) => {
  const {user, logout} = useContext(AuthContext);
  const [allRequest, setAllRequest] = useState<RequestDataReceive[]>([]);
  const [isActive, setIsActive] = useState(false);
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
          <View style={{ flexDirection: 'row' }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                style={{ width: 20, height: 20 }}
                source={require('../../assets/icons/icons8-estrella-50.png')}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.stylesContainer.containerCoins}>
        <TouchableOpacity style={styles.stylesBtm.btmTouchableCoins} onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.stylesText.text}>Mi cartera</Text>
          <Text style={styles.stylesText.textNumberProfile}>{user.wallet.coins}</Text>
          <Image style={{ width: 20, height: 20 }} source={require('../../assets/logoSFtfg.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.stylesContainer.containerProfileTop}>
        <TouchableOpacity style={{marginHorizontal: 20}}>
          <Text style={styles.stylesText.text}>Opciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={styles.stylesText.text}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.stylesContainer.container}>
        <View style={styles.stylesContainer.containerRequest}>
          <Text style={styles.stylesText.textProfileRequest}>Respuestas solicitudes</Text>
          <Text style={styles.stylesText.textNumberProfile}>0</Text>
          <Text style={styles.stylesText.textProfileRequest}>Respuestas peticiones</Text>
          <Text style={styles.stylesText.textNumberProfile}>0</Text>
        </View>
        <View style={styles.stylesContainer.containerRequest}>
          <TouchableOpacity onPress={() => setIsActive(true)}>
            <Text style={styles.stylesText.textProfileRequest}>Solicitudes activas</Text>
          </TouchableOpacity>
          <Text style={styles.stylesText.textNumberProfile}>{countOfferts}</Text>
          <TouchableOpacity onPress={() => setIsActive(true)}>
            <Text style={styles.stylesText.textProfileRequest}>Peticiones activas</Text>
          </TouchableOpacity>
          <Text style={styles.stylesText.textNumberProfile}>{countRequests}</Text>
        </View>
        {
          isActive && (
            <ScrollView style={styles.stylesContainer.scroll}>
              {allRequest && (
                allRequest.slice(0, 5).map(request => {
                  return (
                    <View key={request._id} style={[styles.stylesContainer.container, { width: '100%', height: '100%' }]}>
                      <TouchableOpacity style={styles.stylesContainer.containerHistory2}>
                        <View style={styles.stylesContainer.requestIcons}>
                          <Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/editar.png')} />
                          <Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/bloquear.png')} />
                          <Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/eliminar.png')} />
                        </View>
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', marginHorizontal: 15}}>{request.title}</Text>
                        <Text style={{ fontSize: 12, color: 'black', marginHorizontal: 15}}>{request.description}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={{ fontSize: 12, color: 'black', marginRight: 5}}>{request.owner.username}</Text>
                          <Text style={{ fontSize: 12, color: 'black', marginHorizontal: 5}}>{request.price}</Text>
                          <Image style={{ width: 20, height: 20 }} source={require('../../assets/logoSFtfg.png')} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              )}
              {!allRequest && (
                <Text>No hay request para mostrar</Text>
              )}
            </ScrollView>
        )
        }
      </View>
    </View>
    <Components.AppNavigator navigation={navigation} /></>
  );
};

export default UserPerfil;
