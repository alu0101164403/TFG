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

const Login = ({navigation}) => {
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');

  return (
    <View style={styles.stylesContainer.container}>
      <Image style={styles.stylesImage.logo} source={require('../assets/logoSFtfg.png')} />
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="E-mail@gmail.com"
          placeholderTextColor="#97E4FD"
          //onChangeText={emailInput => setEmail(emailInput)}
        />
      </View>
      <View style={styles.stylesText.inputView}>
        <TextInput
          style={styles.stylesText.textInput}
          placeholder="Password."
          placeholderTextColor="#97E4FD"
          secureTextEntry={true}
          //onChangeText={passwordInput => setPassword(passwordInput)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.stylesBtm.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.stylesBtm.btmConBorde}>
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
