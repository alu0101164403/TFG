/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
//import {CheckBox} from 'react-native-elements';

import {RequestService} from '../../services/request.services';
import { AuthContext } from '../../context/auth.context';


const ModalRequest = ({visible, onClose}: {visible: boolean, onClose: () => void}) => {
  const {user} = useContext(AuthContext);

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleFormSubmit = () => {
    if (user) {
      const data = {
        owner: {id: user.id, username: user.username},
        type: 'offer',
        title: title,
        description: description,
        category: 'sc',
        price: parseInt(price, 10),
      };
      RequestService.saveRequest(data).then( () => {
        onClose();
      }).catch(_err => {
        console.log(_err);
      });
    } else {
      console.log('No hay un usuario conectado');
    }
  };

  return (
    <>
    {
      user && (
        <>
          <Modal
          visible={visible}
          animationType="slide"
          transparent={false}>
          <View style={styles.container}>
            <View style={styles.inputViewDisable}>
              <TextInput
                style={styles.textInput}
                editable={false}
                placeholder={"Usuario: " + user.username}
                placeholderTextColor="#AAAAAA" />
            </View>
            <View style={styles.inputViewDisable}>
              <TextInput
                style={styles.textInput}
                editable={false}
                placeholder={"Email: " + user.email}
                placeholderTextColor="#AAAAAA" />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Título"
                placeholderTextColor="#20B2AA"
                onChangeText={titleInput => setTitle(titleInput)} />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Precio"
                placeholderTextColor="#20B2AA"
                onChangeText={priceInput => setPrice(priceInput)} />
            </View>
            <View style={styles.textArea}>
              <TextInput
                style={styles.textInput}
                editable
                multiline={true}
                numberOfLines={100}
                placeholder="Descripción"
                placeholderTextColor="#20B2AA"
                onChangeText={descriptionInput => setDescription(descriptionInput)} />
            </View>
            {/* Botones salida formulario */}
            <View style={styles.containerButtons}>
              <TouchableOpacity style={styles.btmModalRequest}
                onPress={() => { onClose(); } }>
                <Text style={{color: 'black'}}>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btmModalRequest}
                onPress={() => { handleFormSubmit(); } }>
                <Text style={{color: 'black'}}>Añadir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </>
      )
    }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  textArea: {
    width: '90%',
    height: 120,
    borderWidth: 1,
    borderColor: '#20B2AA',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'black',
  },
  inputView: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#20B2AA',
    width: '90%',
    height: 50,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  inputViewDisable: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    width: '90%',
    height: 50,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  btmModalRequest: {
    width: '40%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#20B2AA',
    marginHorizontal: 10,
  },
});

export default ModalRequest;
