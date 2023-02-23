import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '@rneui/themed';

import styles from '../styles';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.stylesContainer.container}>
      <Text style={styles.stylesText.title}> Welcome</Text>
      <Button
        title="LOG IN"
        buttonStyle={styles.stylesBtm.btmWelcome}
        containerStyle={styles.stylesBtm.containerBtm}
        titleStyle={styles.stylesText.titleBtm}
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="REGISTER"
        buttonStyle={styles.stylesBtm.btmWelcome}
        containerStyle={styles.stylesBtm.containerBtm}
        titleStyle={styles.stylesText.titleBtm}
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Explore Now"
        buttonStyle={styles.stylesBtm.btmExplore}
        containerStyle={styles.stylesBtm.containerBtm}
        titleStyle={styles.stylesText.titleBtm}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default Welcome;
