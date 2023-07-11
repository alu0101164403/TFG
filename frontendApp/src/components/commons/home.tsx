/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  ImageBackground,
} from 'react-native';

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
    <>
    <ImageBackground
      source={require('../../assets/negro.jpg')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.containerHead}>
          <View style={styles.searchContainer}>
            <Image style={styles.searchIcon} source={require('../../assets/icons/search.png')} />
            <TextInput style={styles.searchInput} placeholder="Buscar..." />
          </View>
          <Text style={styles.title}>Últimos añadidos. Mira lo que han publicado tus compañeros.</Text>
          <View style={styles.separator} />
        </View>
        <ScrollView style={styles.scroll}>
          {allRequest && allRequest.reverse().slice(0, 10).map(request => (
            <View key={request._id} style={styles.container}>
              <TouchableOpacity
                style={styles.containerHistory}
                onPress={() => navigation.navigate('ShowRequest', { data: request })}
              >
                <View style={styles.requestInfoContainer}>
                  <Text style={styles.textTitleRequest}>{request.title}</Text>
                  <Text style={styles.textDate}>{request.date.toString().substring(0, 10)}</Text>
                </View>
                <Text numberOfLines={20} style={styles.textProfileRequest}>
                  {request.description}
                </Text>
                <View style={styles.requestInfoContainer}>
                  <Text style={styles.textNumberProfile}>{request.owner.username}</Text>
                  <Text style={styles.textNumberProfile}>{request.price}</Text>
                  <Image style={{ width: 20, height: 20 }} source={require('../../assets/monedaSinFondo.png')} />
                </View>
              </TouchableOpacity>
            </View>
          ))}
          {!allRequest && <Text>No hay request para mostrar</Text>}
        </ScrollView>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.btmSinBorde}>
            <Text style={{ color: 'black' }}>Ver Ventas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btmSinBorde}>
            <Text style={{ color: 'black' }}>Ver Solicitudes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Components.AppNavigator navigation={navigation} />
    </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHead: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 5,
    paddingTop: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  btmSinBorde: {
    borderWidth: 0,
    borderRadius: 9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  containerHistory: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  requestInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20B2AA',
    textAlign: 'center',
    marginTop: 10,
  },
  textProfileRequest: {
    fontSize: 16,
    color: 'black',
  },
  textTitleRequest: {
    fontSize: 18,
    color: '#20B2AA',
    fontWeight: 'bold',
  },
  textDate: {
    fontSize: 12,
    color: 'gray',
  },
  textNumberProfile: {
    fontSize: 14,
    color: 'black',
  },
  separator: {
    width: Dimensions.get('window').width * 0.93,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 25,
    marginHorizontal: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Home;
