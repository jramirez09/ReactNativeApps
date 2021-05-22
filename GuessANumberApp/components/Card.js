import React from 'react';
import {View, StyleSheet} from 'react-native';


const Card = props =>{
    return (
        //spread operator pulls all the key-value pairs of an object, and adds it to a new sorrounding object
        //take all the styles defined in props styles from own custom component
        //take all the key-value pairs defined there and merge them into new object
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
};

const styles= StyleSheet.create({
    card: {
        
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    
});

export default Card;