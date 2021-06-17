export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const deleteProduct = productID => {
    return {
        type: DELETE_PRODUCT,  pid: productID
    }
}

//creating the product in the action
export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        //able to execute with any async code
        //takes a URL where we want to send the request to
        const response = await fetch('https://shoppingapp-2f759-default-rtdb.firebaseio.com/products.json', {
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
    return {
        type: UPDATE_PRODUCT, 
        pid: id,
        productData: {
            title,
            description,
            imageUrl,
            
    }
  }
}