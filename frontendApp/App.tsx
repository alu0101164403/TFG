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
import {ImageBackground, LogBox} from 'react-native';
import {io} from 'socket.io-client';

import AuthProvider from './src/provider/auth.provider';
import Components from './src/components';
import { AuthContext } from './src/context/auth.context';
import { StyleSheet } from 'react-native';
//import CustomHeaderTitle from './src/components/commons/customeHeader';

// -----------------------  PILA DE NAVEGACIÓN DE LA APLICACIÓN --------------------- //

LogBox.ignoreAllLogs();   // Ignore all log notifications

const Stack = createNativeStackNavigator();

const socketIo = io('http://10.0.2.2:8080');



const App = () => {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions} >
          { !isLoggedIn && (
            <Stack.Screen name="Welcome" component={Components.Welcome} options={{title: ''}} />
            )
          }
          <Stack.Screen name="Home" component={Components.Home}  options={{title: ''}}/>
          <Stack.Screen name="Login" component={Components.Login}  options={{title: ''}}/>
          <Stack.Screen name="Register" component={Components.Register}  options={{title: ''}}/>
          <Stack.Screen name="Wallet" component={Components.Wallet}  options={{title: ''}}/>
          <Stack.Screen name="Profile" component={Components.Profile}  options={{title: ''}}/>
          <Stack.Screen name="ShowRequest" component={Components.ShowRequest}  options={{title: ''}}/>
          <Stack.Screen name="Shop" component={Components.Shop} options={{title: ''}} />
          <Stack.Screen name="Payment" component={Components.Payment}  options={{title: ''}}/>
          <Stack.Screen name="ChatRoom">
            {(props) => <Components.ChatRoom {...props} socketIo={socketIo}  options={{title: ''}}/>}
          </Stack.Screen>
          <Stack.Screen name="Chat">
            {(props) => <Components.Chat {...props} socketIo={socketIo}  options={{title: ''}}/>}
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
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  headerTintColor: '#000000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
  //headerTitle: () => <CustomHeaderTitle />,
};


// ----------------------- fin customizar barra de navegación superior --------------------- //

export default App;
