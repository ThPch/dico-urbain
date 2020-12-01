import React, { Component } from 'react';
import { StyleSheet, View, Image, ImageBackground, Dimensions } from 'react-native';
 const {width, height} = Dimensions.get('window')

export default class noInternet extends Component { 
    render() {
        return (
            <View style={ styles.container }>
                <ImageBackground source={require('../resources/bgimage.png')}
                style={styles.noInternetBackground}
                resizeMode='stretch'>
                    <Image source={require('../resources/tombstone.png')}
                    resizeMode='contain'/>
                    <Image source={require('../resources/no_internet_text.png')}
                    style={{width:width*0.8}}
                    resizeMode='contain'/>
                </ImageBackground >
            </View>

         );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
    },

    noInternet: {
        flex: 1,
        resizeMode: 'cover',
    },

    noInternetBackground: {
        width: width,
        height:height,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'       
    },

});