/* eslint-disable prettier/prettier */
import { Image } from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import {View, Text, ScrollView, ImageBackground, Dimensions, StyleSheet} from 'react-native';

import {AuthContext} from '../../context/auth.context';
import Components from '../../components';
import TransactionService, { DataHistory } from '../../services/transaction.services';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

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
      {user && (
        <>
          <View style={styles.container}>
            <View style={styles.containerProfileTop}>
              <Image style={styles.profileImageUser} source={require('../../assets/user1.jpg')} />
              <View style={styles.containerDataUser}>
                <Text style={styles.textDataUser}>{user.username}</Text>
                <Text style={styles.textDataUser}>{user.email}</Text>
                <View style={{ flexDirection: 'row' }}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      style={{ width: 20, height: 20 }}
                      source={require('../../assets/icons/icons8-estrella-50.png')}
                    />
                  ))}
                </View>
                <View style={styles.containerCoins}>
                  <Text style={styles.text}>Mi cartera</Text>
                  <Text style={styles.textNumberProfile}>{user.wallet.coins}</Text>
                  <Image style={{ width: 20, height: 20 }} source={require('../../assets/monedaSinFondo.png')} />
                </View>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={{flex: 1, width: '100%'}}>
              <ScrollView>
                {history.reverse().map(item => {
                  return (
                    <TouchableOpacity key={item._id} style={styles.containerHistory}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.textProfileRequest}>{item.title}</Text>
                        <Text style={styles.textNumberProfile}>
                          {(item.type === 'initial' || item.type === 'offer') ? '+' + item.amount : '-' + item.amount}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textProfileRequest, { marginRight: 20 }]}>por</Text>
                        <Text style={styles.textProfileRequest}>
                          {(item.type === 'initial' || item.type === 'offer') ? item.secondPerson : user.username}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.textNumberProfile}>{item.date.toString().substring(0, 10)}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <Components.AppNavigator navigation={navigation} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  separator: {
    width: Dimensions.get('window').width * 0.93,
    height: 1,
    backgroundColor: '#DCDCDC',
    marginVertical: 25,
    marginHorizontal: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  containerProfileTop: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  containerDataUser: {
    marginLeft: 20,
  },
  containerCoins: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  containerHistory: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    width: '95%',
    marginLeft: 10,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  textDataUser: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    alignContent: 'flex-start',
  },
  textNumberProfile: {
    fontSize: 14,
    color: 'black',
  },
  textDate: {
    fontSize: 12,
    color: 'gray',
  },
  textProfileRequest: {
    fontSize: 16,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    alignContent: 'flex-start',
  },
  profileImageUser: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 10,
  },
});

export default Wallet;
