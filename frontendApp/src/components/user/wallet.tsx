/* eslint-disable prettier/prettier */
import { Image } from '@rneui/base';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, ScrollView} from 'react-native';
//import { useFocusEffect } from '@react-navigation/native';

import styles from '../../styles';
import {AuthContext} from '../../context/auth.context';
import Components from '../../components';
import TransactionService from '../../services/transaction.services';

const Wallet = ({navigation}) => {
  const {user, wallet} = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function getRequestsUser () {
      let historyUser : [];
      historyUser = wallet.history.map((id: String) => {
        try {
          const data = TransactionService.getTransaction(id);
          return data;
        } catch (err) {
          return err;
        }
      });
      historyUser = await Promise.all(historyUser);
      setHistory(historyUser);
    }
    getRequestsUser();
  }, [wallet.history]);

  return (
    <><View style={styles.stylesContainer.container}>

      <View style={styles.stylesContainer.containerProfileTop}>
        <Image style={styles.stylesImage.profileImageUser} source={require('../../assets/logoSFtfg.png')} />
        <View style={styles.stylesContainer.containerDataUser}>
          <Text style={styles.stylesText.textDataUser}>{user.username}</Text>
          <Text style={styles.stylesText.textDataUser}>{user.email}</Text>
          <Text>Number starts</Text>
        </View>
      </View>
      <View style={styles.stylesContainer.containerCoins}>
        <Text style={styles.stylesText.text}>Mi cartera</Text>
        <Text style={styles.stylesText.textNumberProfile}>{wallet.coins}</Text>
        <Image style={{ width: 20, height: 20 }} source={require('../../assets/logoSFtfg.png')} />
      </View>

      <ScrollView style={styles.stylesContainer.scroll}>
        {
          history.map(item => {
            return (
              <View style={styles.stylesContainer.container}>
                <View style={styles.stylesContainer.containerHistory}>
                  <Text style={styles.stylesText.textProfileRequest}>{item.title}</Text>
                  <Text style={styles.stylesText.textProfileRequest}>{(item.type === 'initial' || item.type === 'offer') ? item.secondPerson : user.username}</Text>
                  <Text style={styles.stylesText.textNumberProfile}>{item.date.toString().substring(0 ,10)}</Text>
                  <Text style={styles.stylesText.textNumberProfile}>{(item.type === 'initial' || item.type === 'offer') ? '+' + item.amount : '-' + item.amount}</Text>
                </View>
              </View>
            );
          })
        }
      </ScrollView>
    </View><Components.AppNavigator navigation={navigation} /></>
  );
};

export default Wallet;
