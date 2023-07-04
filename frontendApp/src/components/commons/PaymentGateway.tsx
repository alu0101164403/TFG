import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {View, TextInput, Button, Modal, Text} from 'react-native';
import {AuthContext} from '../../context/auth.context';
import TransactionService from '../../services/transaction.services';
import {RequestDataReceive} from '../../services/request.services';

const Payment = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<ParamListBase>;
  route: RequestDataReceive;
}) => {
  const [showModal, setShowModal] = useState(false);
  const {updateWallet, user} = useContext(AuthContext);
  const amount = route.params.data;

  const handlePayment = async () => {
    if (user) {
      const data = {
        amount: amount,
      };
      TransactionService.addCoins(data, user.id)
        .then(updatedWallet => {
          updateWallet(updatedWallet);
          setShowModal(true);
        })
        .catch(error => {
          return error;
        });
    } else {
      console.log('No hay usuario logueado');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigation.navigate('Shop');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre Apellido Apellido"
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de tarjeta"
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de caducidad"
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Número secreto"
        editable={false}
      />
      <Button title="Pagar" onPress={handlePayment} />

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Ha comprado con éxito sus logos
            </Text>
            <Button title="Volver" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
};

export default Payment;
