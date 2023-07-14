/* eslint-disable prettier/prettier */
/**
 * @file userPerfil.tsx
 * @brief UserPerfil component.
 * Este componente muestra el perfil de usuario con sus datos y las solicitudes relacionadas.
 * También permite al usuario realizar acciones como cerrar sesión.
 */
import {Image} from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions} from 'react-native';

import {AuthContext} from '../../context/auth.context';
import Components from '../';
import { RequestDataReceive, RequestService } from '../../services/request.services';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

/**
 * Componente UserPerfil.
 */
const UserPerfil = ({navigation}: { navigation: NavigationProp<ParamListBase> }) => {
  const {user, logout} = useContext(AuthContext);
  const [allRequest, setAllRequest] = useState<RequestDataReceive[]>([]);
  const [isActive, setIsActive] = useState(false);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  let countRequests = 0, countOfferts = 0;

  /**
   * Verifica si hay un usuario autenticado.
   * Si no hay usuario autenticado, redirige a la página de inicio de sesión.
  */
  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
    }
  }, [navigation, user]);
  /**
   * Obtiene la lista de solicitudes del usuario para poder mostrarlas.
  */
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
  /**
   * Contador de solicitudes activas.
  */
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
  /**
   * Usa el context para cerrar la sesión del usuario al cliclar el botón correspondiente.
  */
  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };
  /**
   * Obtiene la lista de solicitudes del usuario para poder mostrarlas.
  */
  if (!user) {
    return null;
  }

  return (
    <><View style={styles.container}>
      <View style={styles.containerProfileTop}>
        <Image style={styles.profileImageUser} source={require('../../assets/user1.jpg')} />
        <View style={styles.containerDataUser}>
          <Text style={styles.textDataUser}>{user.username}</Text>
          <Text style={styles.textDataUser}>{user.email}</Text>
          <View style={{ flexDirection: 'row' }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                style={{ width: 20, height: 20 }}
                source={require('../../assets/icons/icons8-estrella-50.png')}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.btmTouchableCoins} onPress={() => navigation.navigate('Wallet')}>
            <Text style={styles.text}>Mi cartera   </Text>
            <Text style={styles.textNumberProfile}>{user.wallet.coins}</Text>
            <Image style={{ width: 20, height: 20 }} source={require('../../assets/monedaSinFondo.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{marginRight: 20}}>
          <Text style={styles.text}>Opciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={styles.text}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.container}>
        <View style={styles.containerRequest}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textProfileOptons}>Respuestas solicitudes</Text>
            <Text style={styles.textNumberProfileOptions}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textProfileOptons}>Respuestas peticiones</Text>
            <Text style={styles.textNumberProfileOptions}>0</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerRequest}>
          <TouchableOpacity onPress={() => setIsActive(true)} style={styles.buttonContainer}>
            <Text style={styles.textProfileOptons}>Solicitudes activas</Text>
            <Text style={styles.textNumberProfileOptions}>{countOfferts}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsActive(true)} style={styles.buttonContainer}>
            <Text style={styles.textProfileOptons}>Peticiones activas</Text>
            <Text style={styles.textNumberProfileOptions}>{countRequests}</Text>
          </TouchableOpacity>
        </View>
        {
          isActive && (
            <><View style={styles.separator} />
            <ScrollView style={styles.scroll}>
              {allRequest && (
                allRequest.slice(0, 5).map(request => {
                  return (
                      <TouchableOpacity style={styles.containerHistory}>
                        <View style={styles.requestIcons}>
                          <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginHorizontal: 15}}>{request.title}</Text>
                          <Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/editar.png')} />
                          <Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/bloquear.png')} />
                          <Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/eliminar.png')} />
                        </View>
                        <Text style={{ fontSize: 13, color: 'black', marginHorizontal: 15 }}>{request.description}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontSize: 13, color: 'black', marginRight: 5 }}>{request.owner.username}</Text>
                          <Text style={{ fontSize: 13, color: 'black', marginHorizontal: 5 }}>{request.price}</Text>
                          <Image style={{ width: 20, height: 20 }} source={require('../../assets/monedaSinFondo.png')} />
                        </View>
                      </TouchableOpacity>
                  );
                })
              )}
              {!allRequest && (
                <Text>No hay request para mostrar</Text>
              )}
            </ScrollView></>
          )
        }
      </View>
    </View>
    <Components.AppNavigator navigation={navigation} /></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  separator: {
    width: Dimensions.get('window').width * 0.93,
    height: 1,
    backgroundColor: '#DCDCDC',
    marginVertical: 25,
    marginHorizontal: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  containerProfileTop: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  containerDataUser: {
    marginLeft: 20,
  },
  containerCoins: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  textDataUser: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    alignContent: 'flex-start',
  },
  btmTouchableCoins: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  textNumberProfile: {
    fontSize: 16,
    color: 'black',
  },
  textDate: {
    fontSize: 12,
    color: 'gray',
  },
  textProfileRequest: {
    fontSize: 16,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    alignContent: 'flex-start',
  },
  profileImageUser: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 10,
  },
  containerHistory: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  requestIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  containerRequest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textProfileOptons: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNumberProfileOptions: {
    fontSize: 16,
    marginRight: 15,
    color: 'black',
  },
});

export default UserPerfil;
