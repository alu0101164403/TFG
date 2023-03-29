import React, {useContext} from 'react';
import {Text} from 'react-native-elements';
import {TouchableOpacity, View} from 'react-native';
import styles from '../../styles';

import {AuthContext} from '../../context/auth.context';
import TransactionService from '../../services/transaction.services';

const ShowRequest = ({route}, {navigation}) => {
  const dataRequest = route.params.data;
  const {user, updateUser} = useContext(AuthContext);

  const acceptRequest = async () => {
    const data = {
      buyer: user,
      sellerId: dataRequest.owner.id,
      requestId: dataRequest._id,
    };
    const userUpdated = await TransactionService.buy(data);
    updateUser(userUpdated.data);
    navigation.navigate('Profile');
  };

  return (
    <>
      <View style={styles.stylesContainer.container}>
        <Text>De: {dataRequest.owner.username}</Text>
        <Text>{dataRequest.title}</Text>
        <Text>{dataRequest.description}</Text>
        <Text>Coste {dataRequest.price}</Text>
        <Text>Publicado {dataRequest.date.slice(0, 10)}</Text>
      </View>
      <View style={styles.stylesContainer.containerButtons}>
        <TouchableOpacity
          style={styles.stylesBtm.btmConBorde}
          onPress={acceptRequest}>
          <Text>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stylesBtm.btmConBorde}>
          <Text>Enviar mensaje</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ShowRequest;
