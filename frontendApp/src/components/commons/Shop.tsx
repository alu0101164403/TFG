import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Components from '../';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MethodPayment from './ModalpaymentMethod';

const Shop = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const [modalVisible, setModalVisible] = useState(false);
  let amount_10 = 10;
  let amount_1 = 1;

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/negro.jpg')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.item}>
              <View style={styles.row}>
                <Image
                  style={styles.image}
                  source={require('../../assets/monedaSinFondo.png')}
                />
                <Text style={[styles.title, {fontSize: 20}]}> X 1</Text>
              </View>
              <Text style={styles.description}>Añade 1 Ex a tu cartera</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{amount_1}</Text>
                <Image
                  style={styles.logo}
                  source={require('../../assets/icons/euro.png')}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.item}
              onPress={() => setModalVisible(true)}>
              <View style={styles.row}>
                <Image
                  style={styles.image}
                  source={require('../../assets/monedaSinFondo.png')}
                />
                <Text style={[styles.title, {fontSize: 20}]}> X 10</Text>
              </View>
              <Text style={styles.description}>Añade 10 Ex a tu cartera</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{amount_10}</Text>
                <Image
                  style={styles.logo}
                  source={require('../../assets/icons/euro.png')}
                />
              </View>
              <MethodPayment
                visible={modalVisible}
                onClose={closeModal}
                navigation={navigation}
                data={amount_10}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Image
                style={styles.image}
                source={require('../../assets/sombreroEstudiante.png')}
              />
              <Text style={styles.title}>Crédito 2/2</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <View style={styles.row}>
                <Text style={styles.price}>200</Text>
                <Image
                  style={styles.logo}
                  source={require('../../assets/monedaSinFondo.png')}
                />
              </View>
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
              <View style={styles.row}>
                <Text style={styles.price}>50</Text>
                <Image
                  style={styles.logo}
                  source={require('../../assets/monedaSinFondo.png')}
                />
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Image
                style={styles.image}
                source={require('../../assets/boleto.png')}
              />
              <Text style={styles.title}>Producto 3</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <View style={styles.row}>
                <Text style={styles.price}>35</Text>
                <Image
                  style={styles.logo}
                  source={require('../../assets/monedaSinFondo.png')}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Image
                style={styles.image}
                source={require('../../assets/boleto.png')}
              />
              <Text style={styles.title}>Producto 4</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <View style={styles.row}>
                <Text style={styles.price}>40</Text>
                <Image
                  style={styles.logo}
                  source={require('../../assets/monedaSinFondo.png')}
                />
              </View>
            </View>
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
    borderColor: '#20B2AA',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 2,
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
    color: 'black',
  },
  logo: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Shop;
