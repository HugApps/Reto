import React from 'react';
import { Component, useState } from 'react';
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


export default function Login({ navigation }) {

    const backgroundImage = require("../assets/login.png");
    return (
        <View style={{ flex: 1 ,width:'100%',height:'100%'}}>


            <View style={styles.pageContainer} >
                <View style={{height:'100%',width:'100%',justifyContent:'space-between',alignItems:"center"}}>

                    <Text style={styles.title}>RETO</Text>
                    <View style={{ flex: 1, marginTop:'30%',zIndex: 2000, justifyContent: 'center' }} >
                        <TouchableHighlight 
                        style={styles.registerButton}
                        onPress={()=>{navigation.navigate('Register')}}
                        >
                            <Text style={styles.registerLabel}>Register</Text>
                        </TouchableHighlight>

                        <View style={[styles.registerButton, { backgroundColor: '#F9FAFF' }]}>
                            <Text style={[styles.registerLabel, { color: '#FF6B01' }]}>Login</Text>
                        </View>


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
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2000,
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





