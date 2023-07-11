/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Auth} from '../../services/auth-services';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const Register = ({navigation}: { navigation: NavigationProp<ParamListBase> }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [credential, setCredntial] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmitPress = () => {
    const data = {
      username: username,
      email: email,
      credential: credential,
      password: password,
    };
    Auth.register(data).then( () => {
      navigation.navigate('Login');
    }).catch(_err => {
      console.log(_err);
    });
  };


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/userPerfil.png')} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre"
          placeholderTextColor="#A9A9A9"
          onChangeText={usernameInput => setUsername(usernameInput)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email constitucional"
          placeholderTextColor="#A9A9A9"
          onChangeText={emailInput => setEmail(emailInput)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Credencial"
          placeholderTextColor="#A9A9A9"
          onChangeText={credentialInput => setCredntial(credentialInput)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Contraseña"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          onChangeText={passwordInput => setPassword(passwordInput)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Repetir contraseña"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          //onChangeText={passwordInput => setPassword(passwordInput)}
        />
      </View>
      <TouchableOpacity
        style={styles.btmReady}
        onPress={handleSubmitPress}>
        <Text>Listo!</Text>
      </TouchableOpacity>
      <Text style={styles.forgot_button}>¿Ya tienes cuenta?</Text>
      <TouchableOpacity style={styles.btmSinBorde} onPress={() => navigation.navigate('Login')}>
        <Text>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  forgot_button: {
    height: 30,
    marginBottom: 20,
    color: 'black',
  },
  titleBtm: {
    fontWeight: 'bold',
    color: '#ffff',
    fontSize: 18,
  },
  btmReady: {
    width: '45%',
    borderRadius: 30,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    backgroundColor: '#20B2AA',
  },
  btmSinBorde: {
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 80,
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
    borderColor: '#DCDCDC',
    width: '90%',
    height: 50,
    marginBottom: 20,
    alignItems: 'flex-start',
    color: 'black',
  },
});

export default Register;
