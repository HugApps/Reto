import React, { useEffect, useState, useReducer } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,

} from 'react-native';
/* props 
submitCallback: callback function when continue is pressed
skipCallback: callback function when skip is called
skippable: (true or false) to display skip button or not
continueLabel: text for continue button
continueLabelStyle: 
skipLabelStyle:
skipLabel: text for skip button
continueStyle : style for continue button
skipStyle: style for skipping button

*/



export default function OnboardingButtons({ submitCallback, skipCallback, skipLabelStyle, continueLabelStyle, skippable, continueLabel, skipLabel, continueStyle, skipStyle }) {

    return (
        <View style={styles.buttonContainer}>

            <TouchableHighlight
                style={[continueStyle ? continueStyle : styles.button]}
                onPress={() => { submitCallback() }}
            >
                <Text style={continueLabelStyle ? continueLabelStyle : styles.label}>{continueLabel}</Text>
            </TouchableHighlight>
            {skippable ? <TouchableHighlight
                style={skipStyle ? skipStyle : styles.button}
                onPress={() => { skipCallback() }}
            >
                <Text style={skipLabelStyle ? skipLabelStyle : styles.label}>{skipLabel}</Text>
            </TouchableHighlight> : null
            }



        </View>

    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1, marginTop: 40, justifyContent: 'center', alignItems: 'center', maxHeight: 100, minWidth: '100%'


    },


    button: {
        height: 60,
        width: 200,
        borderRadius: 20,
        backgroundColor: '#FF6B01',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10
    },



    label: {
        fontStyle: 'normal',
        fontSize: 20,
        color: '#F9FAFF',
    },
});
