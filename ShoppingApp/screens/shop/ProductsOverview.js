import React from 'react'
import { FlatList, Platform} from 'react-native'
//tap into our Redux store and get our products from there
import { useSelector, useDispatch } from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'


const ProductsOverviewScreen = props => {
    //useSelector automatically receives the Redux state as an input, and returns whatever you want to get
    const products = useSelector(state => state.products.availableProducts)

    //connect button with actions
    const dispatch = useDispatch()

    return (
        <FlatList
            data={products}
            //item is is the item it's looking at and you tell it what should be your unique key on that item
            keyExtractor={item => item.id}
            //itemData is received by RN, and the item prop is also given by ReactN
            renderItem={itemData => ( 
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title} 
                    price={itemData.item.price} 
                    onViewDetail={() => {
                        props.navigation.navigate( 'ProductDetail', { 
                            productId: itemData.item.id ,
                            productTitle: itemData.item.title
                        })
                     }} 
                     onAddToCart={() => {
                        dispatch(cartActions.addToCart(itemData.item));
                      }}
                 />
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
    headerTitle: 'All Products',
    headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item 
        title='Menu' 
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
        onPress={() => {
            navData.navigation.toggleDrawer()
        }} 
        />
    </HeaderButtons>
    ),
    headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
            title='Cart' 
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
            onPress={() => {
                navData.navigation.navigate('Cart')
            }} 
            />
    </HeaderButtons>
    )
    }
    
}

export default ProductsOverviewScreen