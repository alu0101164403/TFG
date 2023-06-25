/* eslint-disable prettier/prettier */
import { Image } from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import {View, Text, ScrollView} from 'react-native';

import styles from '../../styles';
import {AuthContext} from '../../context/auth.context';
import Components from '../../components';
import TransactionService, { DataHistory } from '../../services/transaction.services';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const Wallet = ({navigation}: { navigation: NavigationProp<ParamListBase> }) => {
  const {user} = useContext(AuthContext);
  const [history, setHistory] = useState<DataHistory[]>([]);

  useEffect(() => {
    async function getHistoryUser () {
      let historyUser;
      if (user) {
        try {
          historyUser = await Promise.all(
            user.wallet.history.map(async (id: String) => {
              const data = await TransactionService.getTransaction(id);
              return data.data;
            })
          );
          setHistory(historyUser);
        } catch (err) {
          return err;
        }
      } else {
        console.log('No hay usuarios conectados.');
      }
    }
    getHistoryUser();
  }, [user]);

  return (
    <>
    {
      user && (
        <>
        <View style={styles.stylesContainer.container}>
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
            <Text style={styles.stylesText.textNumberProfile}>{user.wallet.coins}</Text>
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
      )
    }
    </>
  );
};

export default Wallet;
