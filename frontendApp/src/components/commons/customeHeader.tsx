import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const CustomHeaderTitle = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        style={styles.logo}
        source={require('../../src/assets/logoSFtfg.png')}
      />
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../../assets/icons/menu.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 10,
    height: 10,
  },
});

export default CustomHeaderTitle;
