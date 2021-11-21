import React from 'react';
import { Component, useState ,useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    ImageBackground,
    Alert

} from 'react-native';

import { TouchableHighlight } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database, { firebase } from '@react-native-firebase/database';
import functions from '@react-native-firebase/functions'


export default function VerifyScreen({ navigation }) {

// Handle user state changes
function onAuthStateChanged(user) {
    if (user) {
      user.reload();
      if (user.emailVerified  ) {

        functions().httpsCallable('verifyEmail')({uid:auth().currentUser.uid}).then((result) => {
          if (result) {
            console.log('verify email result', result)
          }
        }).catch((error) => {
          console.log('verify email error', error)

        });
      }

    }




  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);



    const backgroundImage = require("../assets/login.png");
    return (
        <View style={{ flex: 5}}>


            <View style={styles.pageContainer} >
                <View style={{ flex:1,justifyContent:'center',alignItems:"center",zIndex: 2000, }}>

                    <View style={{ flex: 1, maxHeight:'40%',flexDirection:'column',alignItems:'center',borderRadius:30,backgroundColor:'white',zIndex: 2000, justifyContent: 'center' }} >
                        <Text style={{flex:1,margin:10}}>Welcome to Reto</Text>
                        <Text style={{flex:1,margin:10}}>Please check your email to confirm your registraion!</Text>
                        <TouchableHighlight 
                        style={styles.registerButton}
                        onPress={()=>{ firebase.auth().currentUser.sendEmailVerification();}}
                        >
                            <Text style={styles.registerLabel}>Resend email verification</Text>
                        </TouchableHighlight>

                    </View>


                </View>


            </View>
            <View style={styles.imageOverlay} />
            <ImageBackground style={styles.imageBackground} source={backgroundImage} />

        </View>

    )

}


//TODO ADD LINEAR GRADIENT TO IMAGE OVERLAY https://github.com/react-native-linear-gradient/react-native-linear-gradient
const styles = StyleSheet.create({
    pageContainer: {
        right:10,
        left:10,
        top:10,
        height:'100%',
        width:'100%',
        marginTop:-10,
        position: 'absolute',
        opacity: 1,
        justifyContent:'center',
        alignItems: 'center',
        zIndex: 2000,
        flex:1,
        backgroundColor: 'transparent'


    },

    imageOverlay: {
        position: 'absolute',
        opacity: 0.8,
        height: '100%',
        width: '100%',
        backgroundColor: '#282E3C',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000
    },

    imageBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        opacity: 1,
        zIndex: 500,

    },
    title: {
        marginTop: '70%',
        color: '#F9FAFF',
        fontSize: 48,
        fontWeight: '400',
        zIndex: 1000,
        lineHeight: 62,
    },

    registerButton: {
        height: 60,
        width: 200,
        borderRadius: 20,
        backgroundColor: '#FF6B01',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10
    },

    registerLabel: {
        fontStyle: 'normal',
        fontSize: 20,
        color: '#F9FAFF',
    },
    highlight: {
        fontWeight: '700',
    },
});


//linear-gradient(168.67deg, rgba(46, 60, 92, 0.8) 0%, rgba(19, 28, 51, 0.8) 97.29%);





