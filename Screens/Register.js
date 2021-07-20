import React, { useEffect, useReducer } from 'react';
import moment from 'moment';
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
    Alert,
    KeyboardAvoidingView

} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import ErrorIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import functions from '@react-native-firebase/functions';

import database, { firebase } from '@react-native-firebase/database';

auth().useEmulator('http://localhost:9099');
const devDB = firebase.app().database('http://localhost:9000/?ns=badmintonmatcher-4f217')



function validateFullName(value) {

    if (value == null || value.length == 0) {
        return { result: true, message: 'First and last name cant be blank' }
    }

    let name_tokens = value.split(" " || ",");
    if (name_tokens.length != 2) {

        return {
            result: false,
            message: 'Must contain first and last name'
        }
    } else {
        let firstName = name_tokens[0]
        let lastName = name_tokens[1]
        if (firstName && lastName) {
            return { result: true, message: null };
        } else {
            return { result: false, message: 'Must contain first and last name' };
        }
    }


}


function validateEmail(email) {

    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email == null) {
        return { result: false, message: "Must contain valid email address, cant be blank" }
    }

    if (!regEmail.test(email)) {
        return { result: false, message: "Must be a valid email address" }
    } else {
        return { result: true, message:null }
    }

}


function validateDateOfBirth(dob) {

    let regDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

    if (dob == null) {
        return { result: false, message: "Must contain valid a date in YYYY-MM-DD format" }
    }

    if (!regDate.test(dob)) {
        return { result: false, message: "Must be a valid date" }
    } else {
        return { result: true, message: null }
    }

}




function reducer(state, action) {

    const type = action.type
    let value = action.value
    switch (type) {

        case 'SET_FULL_NAME':

            return { ...state, full_name: value,error:'' }
        case 'SET_EMAIL':

            return { ...state, email: value ,error:''}

        case 'SET_DATE_OF_BIRTH':

            const myMomentObject = moment(value, 'YYYY-MM-DD')
            return { ...state, DOB: value ,error:''}

        case 'SET_PASSWORD':

            if (value != state.confirm_password) {
                return { ...state, password: value, error: 'Passwords do not match' }
            } else {
                return { ...state, password: value, error: '' }
            }


        case 'CONFIRM_PASSWORD':
            if (value != state.password) {
                return { ...state, confirm_password: value, error: 'Passwords do not match' }
            } else {
                return { ...state, confirm_password: value, error: '' }
            }


        case 'SET_ERROR':
            console.log('SET_ERROR', value);
            return { ...state, error: value }



    }





}







function ErrorBox(props){

    return(
        <View style={{flex:0.4,minWidth:'100%', alignItems:'center',justifyContents:'center',backgroundColor:'white',borderTopLeftRadius:30,borderTopRightRadius:30}}>

            <Text style={{flex:1,padding:20}}>{props.msg}</Text>

        </View>
    )
}
export default function Register({ navigation }) {

    const backgroundImage = require("../assets/login.png");
    const [buttonActive, setActive] = useState(false);
    const [formInputs, dispatch] = useReducer(reducer,
        {

            full_name: null,
            email: null,
            DOB: null,
            password: null,
            confirm_password: null,
            error: null


        }


    );

    const registerNewUser = (formInputs) => {
        const { full_name, email, DOB, password, confirm_password, error } = formInputs
    
        let currentYear = moment().year();
        let userYear = moment(DOB).year();
        console.log(currentYear,userYear);
        let age = currentYear - userYear;
        
        if(age < 18) {
            dispatch({ type: 'SET_ERROR', value: 'You must be over 18 to register for Reto' })
            return;
        }
        if (email && password) {
    
            auth().createUserWithEmailAndPassword(email, password).then((user) => {
                if (user) {
                    //Create user in db
                    console.log(user);
                    devDB.ref('/clients/' + user.user.uid).set({ full_name, email, DOB ,age }).then((result) => {
    
                    })
                    .catch((dbErrors)=>{

                        const user = firebase.auth().currentUser;
                        dispatch({ type: 'SET_ERROR', value:'Server error, please try again' })
                        user.delete().then((result)=>{
                            if(result){
                                console.log('DELETE result');
                               
                            }
                        })
                      


                    });
                }
            })
            .catch((authErrors)=>{

                console.log('authErrors',authErrors.code,authErrors.message)
                dispatch({ type: 'SET_ERROR', value:authErrors.message })




            })
    
        }
    
    
    
    
    }

    const allFieldsPresent =()=>{
        let result = false;
        Object.keys(formInputs).forEach((k)=>{
            console.log(k,formInputs[k])
            if(k!='error'){
                result = (formInputs[k] != null && formInputs[k].length > 0)
            }
           
        })
        return result;
    }

    useEffect(() => {
        if(!formInputs.error && allFieldsPresent()) {
            setActive(true)
        } else{
            setActive(false);
        }
       
    }, [formInputs])



    return (
        <KeyboardAvoidingView behavior={'position'} style={{ flex: 1, }} contentContainerStyle={{ flex: 1 }}>
            <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#282E3C' }}>

                <View style={{ height: '100%', width: '100%', position: 'absolute', top: 100, borderRadius: 40, backgroundColor: '#E5E5E5' }}></View>
                <View style={{ height: '100%', zIndex: 10000, marginTop: 120, borderRadius: 40, backgroundColor: '#F9FAFF' }}>
                    <TouchableHighlight
                        onPress={() => { navigation.navigate('Login') }}
                        style={{ margin: 20 }}>
                        <Text style={{ fontSize: 30, marginLeft: 20 }}>{"<"}</Text>
                    </TouchableHighlight>


                    <Text style={{ color: '#FF6B01', margin: 20, fontSize: 40, lineHeight: 52, textAlign: 'left', marginLeft: 40 }}>Register</Text>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin: 20 }}>
                        <FormInput
                            icon={'user'}
                            validator={validateFullName}
                            placeHolder={'Full Name ( First Last)'}
                            errorCallBack={(msg) => { dispatch({ type: 'SET_ERROR', value: msg }) }}
                            callback={(value) => { dispatch({ type: 'SET_FULL_NAME', value: value }) }}
                        />
                        <FormInput
                            icon={'mail'}
                            validator={validateEmail}
                            placeHolder={'Email'}
                            errorCallBack={(msg) => { dispatch({ type: 'SET_ERROR', value: msg }) }}
                            callback={(value) => { dispatch({ type: 'SET_EMAIL', value: value }) }}
                        />
                        <FormInput
                            icon={'calendar'}
                            validator={validateDateOfBirth}
                            placeHolder={'Date of birth(YYYY-MM-DD)'}
                            errorCallBack={(msg) => { dispatch({ type: 'SET_ERROR', value: msg }) }}
                            callback={(value) => { dispatch({ type: 'SET_DATE_OF_BIRTH', value: value }) }}
                        />

                        <FormInput
                            icon={'lock'}
                            secure={true}
                            placeHolder={'Password'}

                            callback={(value) => { dispatch({ type: 'SET_PASSWORD', value: value }) }}
                        />
                        <FormInput
                            icon={'lock'}
                            secure={true}
                            error={formInputs.error}
                            placeHolder={'Confirm Password'}
                            callback={(value) => { dispatch({ type: 'CONFIRM_PASSWORD', value: value }) }}
                        />


                        <View>
                            {formInputs.error ? <ErrorBox msg={formInputs.error}/>
                                :
                                <TouchableHighlight
                                    disabled={!buttonActive}
                                    style={[styles.registerButton, { opacity: buttonActive ? 1 : 0.2 }]}
                                    onPress={() => { registerNewUser(formInputs) }}
                                >
                                    <Text style={styles.registerLabel}>Register</Text>
                                </TouchableHighlight>}



                        </View>




                    </View>






                </View>


            </View>
        </KeyboardAvoidingView>

    )

}


/*value : initial value
   placeHolder: set place holder from prop
   error: toggles error icon when error is present
   callback: passes takes object 
   icon: takes component or react-native-vector icon key



*/
function FormInput(props) {
    const [value, setValue] = useState('')
    const [secure, setSecure] = useState(props.secure)
    const [placeHolder, setPlaceHolder] = useState(props.placeHolder)
    const [error, setError] = useState(props.error ? props.error : false);
    const [active, setActive] = useState(false)
    useEffect(() => {
        setActive((value))
        props.callback(value);
        if(error == false){
            if(props.errorCallBack){
                props.errorCallBack('')
            }
          

        }
    }, [value])


    useEffect(() => {
        setActive((value))
        if (error) {
            setError(true)
        }

    }, [props.error])

    return (


        <View style={{ flex: 2, marginLeft: -10, flexDirection: 'row', alignItems: 'center', maxHeight: 80, justifyContent: 'space-evenly' }}>
            <Icon
                color={'#FF6B01'}
                size={25}
                style={{ flex: 1, margin: 10, maxWidth: 30 }}
                name={props.icon} />
            <TextInput
                secureTextEntry={secure}
                onEndEditing={() => {
                    if (props.validator) {
                        let errorResult = props.validator(value)
                        setError(!errorResult.result)
                        if (props.errorCallBack && errorResult.message) {
                            props.errorCallBack(errorResult.message)
                        }

                    } else {

                        setError(props.error ? props.error : false)

                        if (props.errorCallBack) {
                            props.errorCallBack('')
                        }
                    }
                }}
                placeholder={props.placeHolder}
                style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: active ? '#FF6B01' : '#282E3C',
                    maxWidth: '60%',
                    color: !error ? '#FF6B01' : 'black',

                }}
                onChangeText={(event) => {
                    setValue(event);



                }}
            />

            <ErrorIcon
                color={'#FF6B01'}
                size={25}
                style={{ margin: 10, marginLeft: 20, maxWidth: 30, opacity: error ? 1 : 0 }}
                name={'error'} />
        </View>


    )


}


//TODO ADD LINEAR GRADIENT TO IMAGE OVERLAY https://github.com/react-native-linear-gradient/react-native-linear-gradient
const styles = StyleSheet.create({
    pageContainer: {
        right: 10,
        left: 10,
        top: 10,
        height: '100%',
        width: '100%',
        marginTop: -10,
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





