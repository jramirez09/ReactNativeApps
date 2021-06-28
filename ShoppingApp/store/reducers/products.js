import PRODUCTS from '../../data/dummy-data'
import Product from '../../models/product'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products'

const initialState = {
    availableProducts: PRODUCTS, 
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
}

export default (state = initialState, action) => {
    switch (action.type){
        case  SET_PRODUCTS: 
            return{
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }
        case CREATE_PRODUCT : 
            const newProduct = new Product(
                action.productData.id , 
                'u1', 
                action.productData.title, 
                action.productData.imageUrl, 
                action.productData.description,
                action.productData.price
                 )
                return {
                    ...state, 
                    availableProducts: state.availableProducts.concat(newProduct),
                    availableProducts: state.userProducts.concat(newProduct)
                }
        case UPDATE_PRODUCT :
            const productIndex = state.userProducts.findIndex( 
                prod => prod.id === action.pid 
                )
            //state means we do not change it
            //action depends on user input
            const updatedProduct = new Product(
                action.pid, 
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price,
                )
                const updatedUserProducts = [...state.userProducts]
                //so replacing the product at this index with the new updated
                updatedUserProducts[productIndex] = updatedProduct
                const availableProductIndex = state.availableProducts.findIndex( 
                    prod => prod.id === action.pid 
                    )
                const updatedAvailableProducts = [...state.availableProducts]
                updatedAvailableProducts[availableProductIndex] = updatedProduct
                return {
                    ...state,
                    availableProducts: updatedAvailableProducts,
                    userProducts: updatedUserProducts
                }
        case DELETE_PRODUCT:
            return {
                ...state,
                //filter returns a new array that is created by running a function on every item in the array. 
                //if it returns true, we keep  that item. If it is false we delete.
                //basically, the function will keep all the products where IDS do not match
                //if they do match, we know it's the product we want to delete
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                    )
            }
    }
    return state
}