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

import AuthProvider from './src/provider/auth.provider';
import Components from './src/components';
import { AuthContext } from './src/context/auth.context';
import styles from './src/styles';

// -----------------------  PILA DE NAVEGACIÓN DE LA APLICACIÓN --------------------- //

LogBox.ignoreAllLogs();   // Ignore all log notifications

const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

// -----------------------  -------------------------------------- --------------------- //
// ----------------------- customizar barra de navegación superior --------------------- //
const screenOptions = {
  headerStyle: {
    backgroundColor: '#97E4FD',
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
