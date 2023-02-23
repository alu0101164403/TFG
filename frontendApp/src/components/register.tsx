/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../styles';

const Register = ({navigation}) => {
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');

  return (
    <View style={styles.stylesContainer.container}>
      <Image style={styles.stylesImage.logo} source={require('../assets/logoSFtfg.png')} />
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="Username"
          placeholderTextColor="#97E4FD"
          //onChangeText={usernameInput => setUsername(usernameInput)}
        />
      </View>
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="email constitucional"
          placeholderTextColor="#97E4FD"
          //onChangeText={emailInput => setEmail(emailInput)}
        />
      </View>
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="Password"
          placeholderTextColor="#97E4FD"
          secureTextEntry={true}
          //onChangeText={passwordInput => setPassword(passwordInput)}
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
      <TouchableOpacity style={styles.stylesBtm.btmConBorde}>
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
