import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Button,  } from 'react-native';

const image = require("./assets/bg-image.jpeg");



const Home = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>

                

            </ImageBackground>
            
        </View >
        
    );
};


export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        alignItems: 'center',
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    item: {
        borderWidth: 4,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 48,
        width: 48,
        borderRadius: 8,

    },

});

