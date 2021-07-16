import Order from "../../models/order"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = "SET_ORDERS"

export const fetchOrders = () => {
    return async dispatch => {

        try {
            const response = await fetch(
                'https://shoppingapp-2f759-default-rtdb.firebaseio.com/orders/u1.json'
            )

            if (!response.ok) {
                throw new Error('Something went wrong')
            }
    
            const resData = await response.json()
            //loop through object to map the object data. IE: The products in the object to products in the array
            const loadedOrders = []

                for (const key in resData) {
                    loadedOrders.push( new Order(
                        key, 
                        resData[key].cartItems, 
                        resData[key].totalAmount, 
                        new Date(resData[key].date) 
                        )
                    )
                }
            
        dispatch({type: SET_ORDERS, orders: loadedOrders})
    }catch (err) {
        throw err;
    }}
}

export const addOrder = (cartItems, totalAmount) => {
    //return action object
    return async dispatch => {

        const date = new Date()
        const response = await fetch(
            'https://shoppingapp-2f759-default-rtdb.firebaseio.com/orders/ui.json', 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })

        if (!response.ok){
            throw new Error("Something went wrong!")
        }
        //return data set on Firebase when we upload a project
        const resData = await response.json()
        

        dispatch({
                type: ADD_ORDER, 
                orderData: {
                    id: resData.name, 
                    items: cartItems, 
                    amount: totalAmount, 
                    date: date
                }
        })
    }
    
    
}