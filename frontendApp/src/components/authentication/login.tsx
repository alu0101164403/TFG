/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../../styles';
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
    <View style={styles.stylesContainer.container}>
      <Image style={styles.stylesImage.logo} source={require('../../assets/logoSFtfg.png')} />
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={[styles.stylesText.textInput, { color: 'black' }]}
          placeholder="Username"
          placeholderTextColor="#97E4FD"
          onChangeText={emailInput => setUsername(emailInput)}
        />
      </View>
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={[styles.stylesText.textInput, { color: 'black' }]}
          placeholder="Password."
          placeholderTextColor="#97E4FD"
          secureTextEntry={true}
          onChangeText={passwordInput => setPassword(passwordInput)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.stylesBtm.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.stylesBtm.btmConBorde} onPress={handleSubmitPress}>
        <Text>Listo!</Text>
      </TouchableOpacity>
      <Text style={styles.stylesBtm.forgot_button}>¿No tienes cuenta?</Text>
      <TouchableOpacity style={styles.stylesBtm.btmSinBorde} onPress={() => navigation.navigate('Register')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
