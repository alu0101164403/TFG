/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from '../../styles';
import {AuthContext} from '../../context/auth.context';
import Components from '../';


const Home = ({navigation}) => {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <><View style={styles.stylesContainer.container}>
      <Text>Home</Text>
    </View>
    { isLoggedIn && (
    <Components.AppNavigator navigation={navigation} />
    )}</>
  );
};

export default Home;
