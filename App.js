/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React ,{ useEffect, useReducer,useState }from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import LoginScreen from './Screens/Login'
import RegisterScreen from './Screens/Register';
import SelectSports from './Screens/SelectSports';
import auth from '@react-native-firebase/auth';
auth().useEmulator('http://localhost:9099');

import database, { firebase } from '@react-native-firebase/database';

const devDB = firebase.app().database('http://localhost:9000/?ns=badmintonmatcher-4f217')

//Entry point of the app, handles navigation, authentication checking

const AuthenticationStack = createStackNavigator();
const OnBoardingStack = createStackNavigator();
const stackScreenOptions =  { headerShown:false,title: null}
const App = () => {
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
  
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if(!user){

    return (
      <NavigationContainer>
        <AuthenticationStack.Navigator>
          <AuthenticationStack.Screen
            name="Login"
            component={LoginScreen}
            options={stackScreenOptions}
          />
  
          <AuthenticationStack.Screen
            name="Register"
            component={RegisterScreen}
            options={stackScreenOptions}
          />
            
        </AuthenticationStack.Navigator>
      </NavigationContainer>
    );

  } else {
    return(
      <NavigationContainer>
        <OnBoardingStack.Navigator>
          <OnBoardingStack.Screen
            name="SelectSports"
            component={SelectSports}
            options={stackScreenOptions}
          />
  

            
        </OnBoardingStack.Navigator>
      </NavigationContainer>


    );
  }

};




const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
