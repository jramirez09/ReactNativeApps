import { createAppContainer} from 'react-navigation';
//stackNavigator needs individual import
import { createStackNavigator } from 'react-navigation-stack'
import {Platform} from 'react-native'

import ProductsOverviewScreen from '../screens/shop/ProductsOverview'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import Colors from '../constants/Colors'

//createStack takes a JS objet as the first argument where we map screen identifiers to React components that should be loaded as screens
//second argument sets up navigationOptions
const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, 
{
    defaultNavigationOptions: {
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
} )

export default createAppContainer(ProductsNavigator)