import React, {useContext} from 'react';
import {Text} from 'react-native-elements';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {AuthContext} from '../../context/auth.context';
import Components from '../';
import TransactionService from '../../services/transaction.services';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {RequestDataReceive} from '../../services/request.services';

const ShowRequest = ({
  route,
  navigation,
}: {
  route: {params: {data: RequestDataReceive}};
  navigation: NavigationProp<ParamListBase>;
}) => {
  const dataRequest = route.params.data;
  const {user, updateUser, isLoggedIn} = useContext(AuthContext);

  const acceptRequest = async () => {
    const data = {
      buyer: user,
      sellerId: dataRequest.owner.id,
      requestId: dataRequest._id,
    };
    const userUpdated = await TransactionService.buy(data);
    updateUser(userUpdated);
    navigation.navigate('Home');
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/negro.jpg')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.containerInfo}>
            <Text style={styles.text}>De: {dataRequest.owner.username}</Text>
            <View style={styles.line} />
            <Text style={styles.textTitle}>{dataRequest.title}</Text>
            <View style={styles.line} />
            <Text style={styles.text}>{dataRequest.description}</Text>
            <View style={styles.line} />
            <Text style={styles.text}>
              Coste {dataRequest.price}
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/monedaSinFondo.png')}
              />
            </Text>
            <View style={styles.line} />
            <Text style={styles.date}>
              Publicado el {dataRequest.date.slice(0, 10)}
            </Text>
          </View>
          {isLoggedIn && (
            <View style={styles.containerButtons}>
              <TouchableOpacity
                style={styles.btmConBorde}
                onPress={acceptRequest}>
                <Text>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btmConBorde}
                /*  onPress={() =>
                navigation.navigate('Chat', {data: dataRequest.owner})
              } */
              >
                <Text>Enviar mensaje</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Components.AppNavigator navigation={navigation} />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 8,
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    alignContent: 'flex-start',
  },
  textTitle: {
    fontSize: 20,
    color: '#20B2AA',
    fontWeight: 'bold',
    alignContent: 'flex-start',
  },
  date: {
    fontSize: 16,
    color: '#A9A9A9',
    fontWeight: 'bold',
    alignContent: 'flex-start',
  },
  containerInfo: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
    marginHorizontal: 10,
  },
  btmConBorde: {
    width: 150,
    borderRadius: 30,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: '#20B2AA',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default ShowRequest;
