import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  Image, 
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    //safe area should always wrap your topmost view
    
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          // source={{
          //   uri:
          //     'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'
          // }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
          <View style={styles.resultContainer}>
            < BodyText style={styles.resultText}>
              Your phone needed {' '}
              <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to 
              guess the number {' '}
              <Text style={styles.highlight}>{props.userNumber}</Text>
            </BodyText> 
          </View>

          <MainButton title="NEW GAME" onPress={props.onRestart}> NEW GAME</MainButton>
      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    //this sets the vertical margin to 5% of the height
    marginVertical: Dimensions.get('window').height / 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  resultContainer:{
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText:{
    textAlign: 'center',
    fontSize:Dimensions.get('window').height < 400 ? 16: 20
  },
  highlight: {
    color: Colors.primary,
    primary: 'open-sans-bold'
  }

});

export default GameOverScreen;
