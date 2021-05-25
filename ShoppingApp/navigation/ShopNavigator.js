import React from 'react'
import { createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
//stackNavigator needs individual import
import { createStackNavigator } from 'react-navigation-stack'
import {Platform} from 'react-native'

import ProductsOverviewScreen from '../screens/shop/ProductsOverview'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS==='android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS==='android' ? 'white' : Colors.primary
}

//createStack takes a JS objet as the first argument where we map screen identifiers to React components that should be loaded as screens
//second argument sets up navigationOptions
const ProductsNavigator = createStackNavigator(
    {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
    }, 
{    navigationOptions: {
    drawerIcon: drawerConfig => (
        <Ionicons 
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'  } 
            size= {23}
            color={drawerConfig.tintColor}
         />
    )
    },
    defaultNavigationOptions: defaultNavOptions
  } 
)

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'  } 
                size= {23}
                color={drawerConfig.tintColor}
             />
        )
    },
    defaultNavigationOptions: defaultNavOptions
    
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(ShopNavigator)