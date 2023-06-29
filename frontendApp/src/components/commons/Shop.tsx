import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Components from '../';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

const Shop = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={require('../../assets/logoSFtfg.png')}
            />
            <Text style={styles.title}>Crédito 2/2</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text style={styles.price}>200</Text>
            <Image
              style={styles.logo}
              source={require('../../assets/logoSFtfg.png')}
            />
          </View>
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={require('../../assets/boleto.png')}
            />
            <Text style={styles.title}>Ticket para evento 1/1</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text style={styles.price}>50</Text>
            <Image
              style={styles.logo}
              source={require('../../assets/logoSFtfg.png')}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={require('../../assets/logoSFtfg.png')}
            />
            <Text style={styles.title}>Producto 3</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text style={styles.price}>35</Text>
            <Image
              style={styles.logo}
              source={require('../../assets/logoSFtfg.png')}
            />
          </View>
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={require('../../assets/logoSFtfg.png')}
            />
            <Text style={styles.title}>Producto 4</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text style={styles.price}>40</Text>
            <Image
              style={styles.logo}
              source={require('../../assets/logoSFtfg.png')}
            />
          </View>
        </View>
      </View>
      <Components.AppNavigator navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    flex: 0.5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 5,
    color: 'black',
  },
  description: {
    fontSize: 12,
    marginTop: 5,
    color: 'gray',
  },
  price: {
    fontWeight: 'bold',
    marginTop: 5,
    color: 'gray',
  },
  logo: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
});

export default Shop;
