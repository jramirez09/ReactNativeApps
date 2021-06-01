import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../actions/products'

const initialState = {
    availableProducts: PRODUCTS, 
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
}

export default (state = initialState, action) => {
    switch (action.type){
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