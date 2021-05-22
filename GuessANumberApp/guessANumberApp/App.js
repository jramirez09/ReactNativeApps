import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// since we use the StartScreen in App, then we use GameScreen here too.
//and manage the selected number  in the App component
//because that's the only component which is on the screen all the time
//therefore it is the component where we pass data down to the StartGame screen and GameScreen

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  //method to receive state change after confirming userInput
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  //function allows us to configure a new game
  const configureNewGameHandler = () =>{
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  }
  
  const gameOverHandler = numOfRounds =>{
    setGuessRounds(numOfRounds)
  }

  let content = <StartGameScreen onStartGame ={startGameHandler} />;

  //if userNumber has something, and is true then we know a number was selected, we set the content to GameScreen and render
  if (userNumber && guessRounds <=0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    )
  }
  else if (guessRounds > 0){
    //forwarded to game GameOverScreen and can be output there
    content = (
      <GameOverScreen 
        roundsNumber={guessRounds} 
        userNumber={userNumber} 
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
    <View >
        <Header title ="Guess a Number"/>
        {content} 
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
