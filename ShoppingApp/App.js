import React, {useState} from 'react';
import {createStore, combineReducers} from 'redux';
//provider is wrapped around to provide something
import {Provider} from 'react-redux'
//correct way to import appLoading
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

//access state from our redux store
import productsReducer from './store/reducers/products'
import cartReducer  from './store/reducers/cart'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
})

//create our Redux store
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    //if true render return method
    //if false return the appLoading
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    )
  }

  return (
    <Provider store={store} >
      <ShopNavigator />
    </Provider>
  );
}
