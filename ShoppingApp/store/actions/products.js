import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

//action creator  witht http request
export const fetchProducts = () => {
    return async dispatch => {

        try {
            const response = await fetch(
                'https://shoppingapp-2f759-default-rtdb.firebaseio.com/products.json'
            )

            if (!response.ok) {
                throw new Error('Something went wrong')
            }
    
            const resData = await response.json()
            //loop through object to map the object data. IE: The products in the object to products in the array
            const loadedProducts = []
                for (const key in resData) {
                    loadedProducts.push( 
                        new Product(
                            key, 
                            'u1', 
                            resData[key].title, 
                            resData[key].imageUrl, 
                            resData[key].description, 
                            resData[key].price 
                            )
                        )
                }
                
            dispatch({type: SET_PRODUCTS, products:loadedProducts })
        } catch (err) {
            //send to custom analytics server
            throw err
        }
          
    }
}

export const deleteProduct = productId => {
    return async dispatch  => {
       const response = await fetch(
            `https://shoppingapp-2f759-default-rtdb.firebaseio.com/products/${productId}.json`, 
            {
            method: 'DELETE',
            }
        )
        if (!response.ok){
            throw new Error('Something went wrong!')
        }

        dispatch({type: DELETE_PRODUCT,  pid: productID})
    }
    
}

//creating the product in the action
export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        //able to execute with any async code
        //takes a URL where we want to send the request to
        const response = await fetch(
            'https://shoppingapp-2f759-default-rtdb.firebaseio.com/products.json', 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        })
        //return data set on Firebase when we upload a project
        const resData = await response.json()

        

        dispatch ({
            type: CREATE_PRODUCT, 
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            }
        })
    
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    
    return async dispatch => {

       const response = await fetch(
            `https://shoppingapp-2f759-default-rtdb.firebaseio.com/products/${id}.json`, 
            {
                //patch method will update the data
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        })

        if (!response.ok){
            throw new Error('Something went wrong!')
        }

        dispatch( {
            type: UPDATE_PRODUCT, 
            pid: id,
            productData: {
                title,
                description,
                imageUrl,
                
            }
        })
    }
}