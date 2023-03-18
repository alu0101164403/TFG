/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image} from 'react-native';

import styles from '../../styles';

const Loading = () => {
  return (
    <View style={styles.stylesContainer.containerLoading}>
      <Image style={styles.stylesImage.logoLoading} source={require('assets/logonmbreSFtfg.png')} />
    </View>
  );
};

export default Loading;
