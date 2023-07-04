/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// ----------------------------------  IMPORTACIONES --------------------------------- //

import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, LogBox, View} from 'react-native';
import {io} from 'socket.io-client';

import AuthProvider from './src/provider/auth.provider';
import Components from './src/components';
import { AuthContext } from './src/context/auth.context';
import styles from './src/styles';

// -----------------------  PILA DE NAVEGACIÓN DE LA APLICACIÓN --------------------- //

LogBox.ignoreAllLogs();   // Ignore all log notifications

const Stack = createNativeStackNavigator();

const socketIo = io('http://10.0.2.2:8080');

const App = () => {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          { !isLoggedIn && (
            <Stack.Screen name="Welcome" component={Components.Welcome} options={{title: ''}} />
            )
          }
          <Stack.Screen name="Home" component={Components.Home} />
          <Stack.Screen name="Login" component={Components.Login} />
          <Stack.Screen name="Register" component={Components.Register} />
          <Stack.Screen name="Wallet" component={Components.Wallet} />
          <Stack.Screen name="Profile" component={Components.Profile} />
          <Stack.Screen name="ShowRequest" component={Components.ShowRequest} />
          <Stack.Screen name="Shop" component={Components.Shop} />
          <Stack.Screen name="Payment" component={Components.Payment} />
          <Stack.Screen name="ChatRoom">
            {(props) => <Components.ChatRoom {...props} socketIo={socketIo} />}
          </Stack.Screen>
          <Stack.Screen name="Chat">
            {(props) => <Components.Chat {...props} socketIo={socketIo} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

// -----------------------  -------------------------------------- --------------------- //
// ----------------------- customizar barra de navegación superior --------------------- //
const screenOptions = {
  headerStyle: {
    backgroundColor: '#f0f8ff',
  },
 //headerTitle: () => <CustomHeaderTitle />,
  headerTintColor: '#000000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
};

const CustomHeaderTitle = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image style={styles.stylesImage.icon} source={require('./src/assets/logoSFtfg.png')} />
    </View>
  );
};

// ----------------------- fin customizar barra de navegación superior --------------------- //

export default App;
