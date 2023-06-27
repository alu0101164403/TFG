/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import styles from '../../styles';
import Components from '../';
import {RequestDataReceive, RequestService} from '../../services/request.services';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const Home = ({navigation}: { navigation: NavigationProp<ParamListBase> }) => {
  const [allRequest, setAllRequest] = useState<RequestDataReceive[]>([]);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const response = await RequestService.getAllRequest();
        const data = response.data;
        setAllRequest(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllRequests();
  }, [allRequest]);

  return (
    <><View style={styles.stylesContainer.container}>
      <View style={styles.stylesContainer.containerTitle}>
        <Text style={styles.stylesText.title}>Ùltimos añadidos. Mira lo que han publcado tus compañeros.</Text>
      </View>
      <ScrollView style={styles.stylesContainer.scroll}>
        { allRequest && (
          allRequest.slice(0, 5).map(request => {
          return (
              <View key={request._id} style={[styles.stylesContainer.container, {width: '100%', height: 100}]}>
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
