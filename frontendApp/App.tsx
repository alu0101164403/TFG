/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';

import AuthProvider from './src/provider/auth.provider';

import Welcome from './src/components/welcome';
import Home from './src/components/home';
import Login from './src/components/authentication/login';
import Register from './src/components/authentication/register';
import Profile from './src/components/user/userProfile';
import Wallet from './src/components/user/wallet';


// Ignore all log notifications:
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} options={{title: ''}} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
