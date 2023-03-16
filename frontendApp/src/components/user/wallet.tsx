/* eslint-disable prettier/prettier */
import { Image } from '@rneui/base';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import styles from '../../styles';

const Wallet = () => {
  return (
    <View style={styles.stylesContainer.container}>

      <View style={styles.stylesContainer.containerProfileTop}>
        <Image style={styles.stylesImage.profileImageUser} source={require('../../assets/logoSFtfg.png')} />
        <View style={styles.stylesContainer.containerDataUser}>
          <Text style={styles.stylesText.textDataUser}>UserPepe</Text>
          <Text style={styles.stylesText.textDataUser}>UserPepe@gmail.com</Text>
          <Text>Number starts</Text>
        </View>
      </View>
      <View style={styles.stylesContainer.containerCoins}>
          <Text style={styles.stylesText.text}>Mi cartera</Text>
          <Text style={styles.stylesText.textNumberProfile}>45</Text>
          <Image style={{width: 20, height: 20}} source={require('../../assets/logoSFtfg.png')} />
      </View>

      <ScrollView style={styles.stylesContainer.scroll}>
      <View style={styles.stylesContainer.container}>
          <View style={styles.stylesContainer.containerHistory}>
            <Text style={styles.stylesText.textProfileRequest}>{'Menu vegano'} por {'Pepe'}</Text>
            <Text style={styles.stylesText.textNumberProfile}>3/05/2023</Text>
            <Text style={styles.stylesText.textNumberProfile}>+ 5</Text>
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

export default Wallet;
