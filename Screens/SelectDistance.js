import React, { useEffect, useState, useReducer } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList

} from 'react-native';



// @refresh reset
import { TouchableHighlight } from 'react-native-gesture-handler';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const devDB = firebase.app().database('http://localhost:9000/?ns=badmintonmatcher-4f217');

function submit(selected_time) {
    let currentUser = auth().currentUser;
    let data = {}
    Object.keys(selected_time).forEach((v) => {
        let item = selected_time[v]
        if (item == 1) {
            data[v] = true
        }

    })

    devDB.ref('/clients/' + currentUser.uid + '/preffered_match_distance/').set(data).then((result) => {

    })




}

function reducer(state, action) {

    const type = action.type
    let value = action.value
    switch (type) {

        case 'ADD_DISTANCE':
            return { ...state, selected_distance: value }
        case 'REMOVE_DISTANCE':
            return { ...state, selected_distance: value }

        case 'SUBMIT':
            submit(state.selected_distance)
            return state;


    }


}


function Footer(props) {
    return (
        <View style={{ flex: 1, marginTop: 40, justifyContent: 'center', alignItems: 'center', maxHeight: 100, minWidth: '100%' }}>

            <TouchableHighlight
                style={[styles.registerButton]}
                onPress={() => { props.submit(); }}
            >
                <Text style={styles.registerLabel}>Next</Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={[styles.registerButton]}
                onPress={() => { props.skip(); }}
            >
                <Text style={styles.registerLabel}>Skip</Text>
            </TouchableHighlight>



        </View>

    )
}



export default function SelectDistance({ navigation }) {
    const distanceOptions = ['5km', '10km', '15km', '20km', 'flexible']
    const [formInputs, dispatch] = useReducer(reducer,
        {
            selected_distance: null,
            error: null,
        }
    );
    console.log(formInputs);
    return (
        <View style={{ flex: 1, margin: 10, backgroundColor: '#E5E5E5', padding: 10, justifyContent: 'flex-start', width: '100%', height: '100%' }}>
            <Text style={{ flexWrap: 'wrap', padding: 21, marginTop: 10, color: '#282E3C', fontSize: 26, lineHeight: 46 }}>How far are you willing to travel for your game?</Text>

            <FlatList
                data={distanceOptions}
                renderItem={(item) => {
                    console.log(formInputs.selected_distance, item.item)
                    return (
                        <Pill
                            item={item}
                            active={(item.item == formInputs.selected_distance)}
                            addTime={
                                (val) => {
                                    dispatch({ type: 'ADD_DISTANCE', value: val })

                                }
                            }
                        />)
                }}
                keyExtractor={item => item.name}
                ListFooterComponent={
                    <Footer
                        submit={
                            () => {
                                dispatch({ type: 'SUBMIT', value: null });
                                //.navigate('SelectDistance')
                            }
                        }
                        skip={() => { console.log('TBD') }} />

                }
            />


        </View>

    )

}


function Pill(props) {

    const [selected, setSelected] = useState(props.active);
    console.log(selected);
    const selectPill = () => {
        props.addTime(props.item.item)
        setSelected(!selected);
    }

    useEffect(() => {
        setSelected(props.active);

    },[props.active])

    return (
        <View>
            <TouchableHighlight onPress={() => { selectPill(); }} style={{ flex: 1, margin: 10, marginBottom: 10, padding: 20, borderRadius: 15, maxHeight: 80, backgroundColor: 'white', flexDirection: 'row' }}>
                <Text style={{ textTransform: 'capitalize', color: selected ? '#FF6B01' : '#282E3C' }}>{props.item.item}</Text>
            </TouchableHighlight>
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




