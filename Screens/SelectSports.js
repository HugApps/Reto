import React, { useEffect, useState, useReducer } from 'react';
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
    FlatList

} from 'react-native';




import { TouchableHighlight } from 'react-native-gesture-handler';
import database, { firebase } from '@react-native-firebase/database';

const devDB = firebase.app().database('http://localhost:9000/?ns=badmintonmatcher-4f217');

function reducer(state, action) {

    const type = action.type
    let value = action.value
    switch (type) {

        case 'ADD_SPORT':
            let old_list = {...state.selected_sports}

            old_list[value.sport] = {...value}
            console.log(old_list);
            return { ...state, selected_sports:old_list }
        case 'REMOVE_SPORT':

            return { ...state, email: value, error: '' }

      


    }





}


const mock_sports = {
    'badminton': { name: 'Badminton', max_set: 3, max_score: 21, min_players: 2, max_players: 4 },
    'table_tennis': { name: 'Table tennis', max_set: 3, max_score: 21, min_players: 2, max_players: 4 },
    'squash': { name: 'Squash', max_set: 3, max_score: 21, min_players: 2, max_players: 2 },
    'water_polo': { name: 'Water polo', max_set: 3, max_score: 21, min_players: 2, max_players: 12 },
    'tennis': { name: 'Tennis', max_set: 3, max_score: 21, min_players: 2, max_players: 4 },
    'basketball': { name: 'basketball', max_set: 3, max_score: 21, min_players: 2, max_players: 9 }
}





export default function SelectSports({ navigation }) {
    // We are just going to hardcode some sports for now, later on we will fetch from our db, once we find a easy way to seed it



    const [sports, setSports] = useState();
    const [formInputs, dispatch] = useReducer(reducer,
        {

            selected_sports: {},
            error: null,


        }


    );

    // use this for now to seed sports table
    useEffect(() => {
        devDB.ref('/sports').set(mock_sports).then((result) => {
        })


    }, []);

    useEffect(() => {
        devDB.ref('/sports').once('value').then((snapShot) => {
            if (snapShot) {
                let allSportsKeys = Object.keys(snapShot.val());
                setSports(allSportsKeys.map((s, i) => {
                    return {
                        key: s,
                        name: snapShot.val()[s].name
                    }
                }))



            }

        })



    }, []);

    if (sports) {

        return (
            <View style={{ flex: 1, margin: 10, backgroundColor: '#E5E5E5', padding: 10, justifyContent: 'flex-start', width: '100%', height: '100%' }}>
                <Text style={{ flexWrap: 'wrap', padding: 21, marginTop: 10, color: '#282E3C', fontSize: 26, lineHeight: 46 }}>What sports are you interested in?</Text>

                <FlatList
                    data={sports.sort((a, b) => { return a.name < b.key })}
                    renderItem={(item) => { return (<SportPill item={item} addSport={(val)=>{dispatch({ type: 'ADD_SPORT', value:val })}} />) }}
                    keyExtractor={item => item.name}
                />


            </View>

        )

    } else {
        return null;
    }


}


function SportPill(props) {
    const sportReducer = (state, action) => {
        const type = action.type
        let value = action.value
        switch (type) {

            case 'SET_LEVEL':
                props.addSport({ ...state, level: value })
                return { ...state, level: value }
            case 'SET_STYLE':
                props.addSport({ ...state, level: value })
                return { ...state, playStyle: value }

        }

    }
    const [selected, setSelected] = useState(false);
    const [sportParams, dispatch] = useReducer(sportReducer,
        {
            sport:props.item.item.name,
            level: 'Beginner',
            playStyle: 'Casual',
        }
    );


    const toggleExpand = () => {

        setSelected(!selected);

    }

    const updateSportLevel= (val) =>{
        dispatch({ type: 'SET_LEVEL', value:val })

    }

    const updateSportStyle= (val) =>{
        dispatch({ type: 'SET_STYLE', value:val })
 

    }

    


    useEffect(()=>{


    },sportParams)
    return (
        <View>
            <TouchableHighlight onPress={() => { toggleExpand(); }} style={{ flex: 1, margin: 10, marginBottom: 10, padding: 20, borderRadius: 15, maxHeight: 80, backgroundColor: 'white', flexDirection: 'row' }}>

                <Text style={{ textTransform: 'capitalize' }}>{props.item.item.name}</Text>
            </TouchableHighlight>
            {selected ? <View style={{ flex: 1, marginRight: 10, marginLeft: 10, backgroundColor: 'white', minHeight: 250 }}>
                <Text style={{ margin: 10 }}>Level:</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                    <ButtonPill currentValue={sportParams.level} label={'Beginner'} dispatch={(val)=>updateSportLevel(val)}/>    
                    <ButtonPill currentValue={sportParams.level} label={'Intermediate'} dispatch={(val)=>updateSportLevel(val)}/>
                    <ButtonPill currentValue={sportParams.level} label={'Advanced'} dispatch={(val)=>updateSportLevel(val)}/>
                </View>

                <Text style={{ margin: 10 }}>Play style:</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                    <ButtonPill  currentValue={sportParams.playStyle} label={'Casual'} dispatch={(val)=>updateSportStyle(val)}/>
                    <ButtonPill  currentValue={sportParams.playStyle} label={'Competitive'} dispatch={(val)=>updateSportStyle(val)}/>
                    <ButtonPill  currentValue={sportParams.playStyle} label={'Both'} dispatch={(val)=>updateSportStyle(val)}/>
                </View>

            </View> : null}



        </View>



    )



}


//dispatch -> callback when button is clicked
//label -> label and value
function ButtonPill(props) {
    const [toggled,setToggled] = useState(props.currentValue == props.label);
    useEffect(()=>{
        setToggled(props.currentValue == props.label)
    },[props.currentValue])
    return (
        <TouchableHighlight  
        onPress={()=>{setToggled(!toggled);props.dispatch(props.label)}}
        containerStyle={{ margin: 10, backgroundColor: toggled ?'#FF6B01' :'#E5E5E5', minWidth: 100, maxHeight: 60, padding: 10, borderRadius: 15, }}>
            <Text style={{ margin: 10 ,color: toggled ?'white' :'black'}}>{props.label}</Text>
        </TouchableHighlight>
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





