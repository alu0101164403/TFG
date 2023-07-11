/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Auth} from '../../services/auth-services';
import {AuthContext} from '../../context/auth.context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const Login = ({navigation}: { navigation: NavigationProp<ParamListBase> }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);


  const handleSubmitPress = () => {
    const data = {
      username: username,
      password: password,
    };
    setPassword(''); //evita que se mantenga la contraseña en el formulario tras cerrar sesion
    Auth.login(data).then( async dataLogin => {
      login(dataLogin);
      navigation.navigate('Home');
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
          placeholder="Nombre de usuario"
          placeholderTextColor="#A9A9A9"
          onChangeText={emailInput => setUsername(emailInput)}
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
      <TouchableOpacity>
        <Text style={styles.forgot_button}>¿Te olvidaste la contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btmReady} onPress={handleSubmitPress}>
        <Text>Listo!</Text>
      </TouchableOpacity>
      <Text style={styles.forgot_button}>¿No tienes cuenta?</Text>
      <TouchableOpacity style={styles.btmSinBorde} onPress={() => navigation.navigate('Register')}>
        <Text>Registrarse</Text>
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

export default Login;
