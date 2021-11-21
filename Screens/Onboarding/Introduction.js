import React, { useEffect, useState, useReducer } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    FlatList,
    Platform,
    Image

} from 'react-native';

// @refresh reset
import { TouchableHighlight } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';



function CarouselCard({ title, image }) {

    return (

        <View style={{
            marginTop: '50%',
            justifyContent: "flex-start",
            flex: 4,
            backgroundColor: '#282E3C',
            width: '100%',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30
        }}>


            <Text style={{ flex: 1, marginTop: 150, flexWrap: 'wrap', color: '#F9FAFF', fontSize: 24, fontWeight: '400', textAlign: 'center' }}>{title}</Text>
            <View style={{
                marginTop: -200,
                flex: 3, justifyContent: 'center', alignItems: 'center'
            }}>
                <Image resizeMode='contain' style={{ marginTop: -200 }} resizeMethod={'resize'} source={image} />
            </View>

        </View>
    )




}



export default function Introduction({ navigation }) {
    const [currentIndex, setIndex] = useState(0);

    const introPages = [
        { title: "Connect & play with new people around you", image: require('../../assets/onboarding_1.png') },
        { title: "Meet people sharing the same passion", image: require('../../assets/onboarding_2.png') },
        { title: "Be part of an active community", image: require('../../assets/onboarding_3.png') },
    ]
    return (
        <View style={styles.pageContainer}>
            <Text>Introduction</Text>
            <Pagination
                dotsLength={introPages.length}
                activeDotIndex={currentIndex}
                containerStyle={{position:'absolute',top:250,zIndex:1000, backgroundColor: 'transparent' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: '#FF6B01'
                }}
                inactiveDotStyle={{
                    backgroundColor: '#FF6B01',
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,

                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.5}
                inactiveDotScale={1}
            />



            <Carousel
                layout={'stack'}
                layoutCardOffset={`10`}
                onBeforeSnapToItem={(index)=>{setIndex(index);}}
                data={introPages}
                renderItem={(item, index) => {  return (<CarouselCard index={index} {...item.item} />) }}
                sliderWidth={800}
                itemWidth={Dimensions.get('window').width}
            />

        </View>
    )
    // We are just going to hardcode some sports for now, later on we will fetch from our db, once we find a easy way to seed it

}


//TODO ADD LINEAR GRADIENT TO IMAGE OVERLAY https://github.com/react-native-linear-gradient/react-native-linear-gradient
const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',



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





