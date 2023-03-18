/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
//import {CheckBox} from 'react-native-elements';

import styles from '../../styles';
import requestServices from '../../services/request.services';
import { AuthContext } from '../../context/auth.context';


const ModalRequest = ({visible, onClose}) => {
  const {user} = useContext(AuthContext);

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const handleFormSubmit = () => {
    const data = {
      owner: user.username,
      category: 'offer',
      title: title,
      description: description,
    };
    requestServices.saveRequest(data).then( () => {
      onClose();
    }).catch(_err => {
      console.log(_err);
    });
  };


  return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}>
        {/* Contenido del formulario */}
        <View style={styles.stylesContainer.container}>
          <View style={styles.stylesText.inputViewDisable}>
            <TextInput
              style={styles.stylesText.textInput}
              editable={false}
              placeholder={"Usuario: " + user.username}
              placeholderTextColor="#AAAAAA" />
          </View>
          <View style={styles.stylesText.inputViewDisable}>
            <TextInput
              style={styles.stylesText.textInput}
              editable={false}
              placeholder={"Email: " + user.email}
              placeholderTextColor="#AAAAAA" />
          </View>
          <View style={styles.stylesText.inputView}>
            <TextInput
              style={styles.stylesText.textInput}
              placeholder="Título"
              placeholderTextColor="#97E4FD"
              onChangeText={titleInput => setTitle(titleInput)} />
          </View>
          <View style={styles.stylesText.textArea}>
            <TextInput
              style={styles.stylesText.textInput}
              editable
              multiline={true}
              numberOfLines={100}
              placeholder="Descripción"
              placeholderTextColor="#97E4FD"
              onChangeText={descriptionInput => setDescription(descriptionInput)} />
          </View>
          {/* Botones salida formulario */}
          <View style={styles.stylesContainer.containerButtons}>
            <TouchableOpacity style={styles.stylesBtm.btmModalRequest}
              onPress={() => { onClose(); } }>
              <Text>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stylesBtm.btmModalRequest}
              onPress={() => { handleFormSubmit(); } }>
              <Text>Añadir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};

export default ModalRequest;
