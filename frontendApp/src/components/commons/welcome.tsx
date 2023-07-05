import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button} from '@rneui/themed';

import {NavigationProp, ParamListBase} from '@react-navigation/native';

const Welcome = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  return (
    <View style={styles.container}>
      <Image
        style={{width: 360, height: 100, marginBottom: 80}}
        source={require('../../assets/logonNombreSinFondo.png')}
      />
      <Button
        title="INICIAR SESIÓN"
        buttonStyle={styles.btmWelcome}
        containerStyle={styles.containerBtm}
        titleStyle={styles.titleBtm}
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="REGISTRARSE"
        buttonStyle={styles.btmWelcome}
        containerStyle={styles.containerBtm}
        titleStyle={styles.titleBtm}
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Entra como invitado"
        buttonStyle={styles.btmExplore}
        containerStyle={styles.containerBtm}
        titleStyle={styles.titleExplore}
        onPress={() => navigation.navigate('Home')}
      />
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
  btmWelcome: {
    backgroundColor: '#20B2AA',
    borderRadius: 30,
    width: 200,
    height: 50,
    marginBottom: 20,
  },
  btmExplore: {
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    width: 160,
    height: 45,
    marginTop: 50,
  },
  containerBtm: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBtm: {
    fontWeight: 'bold',
    color: '#ffff',
    fontSize: 18,
  },
  titleExplore: {
    color: '#ffff',
    fontSize: 14,
  },
});

export default Welcome;
