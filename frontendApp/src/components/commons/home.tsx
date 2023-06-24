/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ListItem} from "@react-native-material/core";

import styles from '../../styles';
import {AuthContext} from '../../context/auth.context';
import Components from '../';
import RequestService from '../../services/request.services';

const Home = ({navigation}) => {
  const {isLoggedIn} = useContext(AuthContext);
  const [allRequest, setAllRequest] = useState();

  useEffect(() => {
    RequestService.getAllRequest().then(data => {
      setAllRequest(data);
    }).catch(err => {
      return err;
    });
  }, [allRequest]);

  return (
    <><View style={styles.stylesContainer.container}>
      <View style={styles.stylesContainer.containerTitle}>
        <Text style={styles.stylesText.title}>Ùltimos añadidos</Text>
      </View>
      <ScrollView style={styles.stylesContainer.scroll}>
        { allRequest && (
          allRequest.slice(0, 5).map(request => {
          return (
              <View key={request._id} style={styles.stylesContainer.container, {width: '100%', height: 100}}>
                <TouchableOpacity style={styles.stylesContainer.containerHistory} onPress={() => navigation.navigate('ShowRequest', {data: request})}>
                  <Text style={styles.stylesText.textProfileRequest}>{request.title}</Text>
                  <Text style={styles.stylesText.textProfileRequest}>{request.description}</Text>
                  <Text style={styles.stylesText.textNumberProfile}>{request.owner.username}</Text>
                  <Text style={styles.stylesText.textNumberProfile}>{request.price}</Text><Image style={{width: 20, height: 20}} source={require('../../assets/logoSFtfg.png')} />
                </TouchableOpacity>
              </View>
            );
          })
        )}
        { !allRequest && (
          <Text>No hay request para mostrar</Text>
        )}
      </ScrollView>
      <View style={styles.stylesContainer.containerButtons}>
        <TouchableOpacity style={styles.stylesBtm.btmSinBorde}>
          <Text>Ver Ventas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stylesBtm.btmSinBorde}>
          <Text>Ver Solicitudes</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Components.AppNavigator navigation={navigation} />
    </>
  );
};

export default Home;
