/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../styles';
import Auth from '../services/auth-services';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmitPress = () => {
    const data = {
      username: username,
      password: password,
    };
    Auth.login(data).then( () => {
      navigation.navigate('Home');
    }).catch(_err => {
      console.log(_err);
    });
  };

  return (
    <View style={styles.stylesContainer.container}>
      <Image style={styles.stylesImage.logo} source={require('../assets/logoSFtfg.png')} />
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="Username"
          placeholderTextColor="#97E4FD"
          onChangeText={emailInput => setUsername(emailInput)}
        />
      </View>
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
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
