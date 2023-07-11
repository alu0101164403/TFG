import React, {useContext} from 'react';
import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {AuthContext} from '../../context/auth.context';

const MethodPayment = ({
  visible,
  onClose,
  navigation,
  data,
}: {
  visible: boolean;
  onClose: () => void;
  navigation: NavigationProp<ParamListBase>;
  data: number;
}) => {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && (
        <Modal visible={visible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar método de pago</Text>
              <View style={styles.paymentButtons}>
                <TouchableOpacity
                  style={styles.paymentButton}
                  onPress={() => navigation.navigate('Payment', {data: data})}>
                  <Image
                    style={styles.paymentImage}
                    source={require('../../assets/visa.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.paymentButton}
                  onPress={() => navigation.navigate('Payment', {data: data})}>
                  <Image
                    style={styles.paymentImage}
                    source={require('../../assets/paypal.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.paymentButton}
                  onPress={() => navigation.navigate('Payment', {data: data})}>
                  <Image
                    style={styles.paymentImage}
                    source={require('../../assets/bizum.png')}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  onClose();
                }}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {!isLoggedIn && (
        <Modal visible={visible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Debe iniciar sesión para esta acción.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                onClose();
              }}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  selectPaymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  paymentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentButton: {
    alignItems: 'center',
  },
  paymentImage: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  closeButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
};

export default MethodPayment;
