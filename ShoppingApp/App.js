import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
//provider is wrapped around to provide something
import {Provider} from 'react-redux'
//correct way to import appLoading
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk'

//access state from our redux store
import productsReducer from './store/reducers/products'
import cartReducer  from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})

//create our Redux store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
