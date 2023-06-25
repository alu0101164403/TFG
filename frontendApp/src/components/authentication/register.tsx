/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../../styles';
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
    <View style={styles.stylesContainer.container}>
      <Image style={styles.stylesImage.logo} source={require('../../assets/logoSFtfg.png')} />
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="Username"
          placeholderTextColor="#97E4FD"
          onChangeText={usernameInput => setUsername(usernameInput)}
        />
      </View>
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="email constitucional"
          placeholderTextColor="#97E4FD"
          onChangeText={emailInput => setEmail(emailInput)}
        />
      </View>
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="Credential"
          placeholderTextColor="#97E4FD"
          onChangeText={credentialInput => setCredntial(credentialInput)}
        />
      </View>
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="Password"
          placeholderTextColor="#97E4FD"
          secureTextEntry={true}
          onChangeText={passwordInput => setPassword(passwordInput)}
        />
      </View>
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="Repeat password"
          placeholderTextColor="#97E4FD"
          secureTextEntry={true}
          //onChangeText={passwordInput => setPassword(passwordInput)}
        />
      </View>
      <TouchableOpacity
        style={styles.stylesBtm.btmConBorde}
        onPress={handleSubmitPress}>
        <Text>Listo!</Text>
      </TouchableOpacity>
      <Text style={styles.stylesBtm.forgot_button}>¿Ya tienes cuenta?</Text>
      <TouchableOpacity style={styles.stylesBtm.btmSinBorde} onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
