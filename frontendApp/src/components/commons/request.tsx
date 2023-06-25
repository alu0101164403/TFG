import React, {useContext} from 'react';
import {Text} from 'react-native-elements';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from '../../styles';

import {AuthContext} from '../../context/auth.context';
import Components from '../';
import TransactionService from '../../services/transaction.services';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {RequestDataReceive} from '../../services/request.services';

const ShowRequest = ({
  route,
  navigation,
}: {
  route: RequestDataReceive;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const dataRequest = route.params.data;
  console.log('t', dataRequest);
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
      <View style={styles.stylesContainer.container}>
        <View style={styles.stylesContainer.containerInfo}>
          <Text style={styles.stylesText.text}>
            De: {dataRequest.owner.username}
          </Text>
          <View style={styles.stylesText.line} />
          <Text style={styles.stylesText.text}>{dataRequest.title}</Text>
          <View style={styles.stylesText.line} />
          <Text style={styles.stylesText.text}>{dataRequest.description}</Text>
          <View style={styles.stylesText.line} />
          <Text style={styles.stylesText.text}>
            Coste {dataRequest.price}
            <Image
              style={{width: 20, height: 20}}
              source={require('../../assets/logoSFtfg.png')}
            />
          </Text>
          <View style={styles.stylesText.line} />
          <Text style={styles.stylesText.text}>
            Publicado el {dataRequest.date.slice(0, 10)}
          </Text>
        </View>
        {isLoggedIn && (
          <View style={styles.stylesContainer.containerButtons}>
            <TouchableOpacity
              style={styles.stylesBtm.btmConBorde}
              onPress={acceptRequest}>
              <Text>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stylesBtm.btmConBorde}
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
    </>
  );
};

export default ShowRequest;
