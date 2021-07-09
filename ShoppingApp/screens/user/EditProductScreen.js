import React, {useState, useEffect, useCallback, useReducer} from 'react'
import {View, Text, ScrollView, TextInput, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator} from 'react-native'

import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useSelector, useDispatch} from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'


//useReducer typically too manage connected states, or more complex states

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE '

//if this action occurrs
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE ){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities  = {
            ...state.inputValidities,
            [action.input] :  action.isValid
        }

        let updatedFormIsValid = true;
        for (const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues:  updatedValues
        }
    }
    return state;
}


const EditProductScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const prodId = props.navigation.getParam('productId')
    //find the product with the prodId
    //return true if  the ID of the product being looked at is equal to the prodID I retrieved from the parameters
    const editedProduct = useSelector(state => 
        state.products.userProducts.find( prod=> prod.id === prodId)
    )

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
            inputValues: {
                title: editedProduct ? editedProduct.title : '',
                imageUrl: editedProduct ? editedProduct.imageUrl : '',
                description: editedProduct ? editedProduct.description : '',
                price: ''
            }, 
            inputValidities: {
                title: editedProduct ? true : false,
                imageUrl: editedProduct ? true : false,
                description: editedProduct ? true : false,
                price: editedProduct ? true : false,
            }, 
            formIsValid: editedProduct ? true : false,
        })

    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    // const [titleIsValid, setTitleIsValid] = useState(false)
    // const [imageUrl, setImageUrl] = useState(
    //     editedProduct ? editedProduct.imageUrl : ''
    //     )
    // const [price, setPrice] = useState('')
    // const [description, setDescription] = useState(
    //     editedProduct ? editedProduct.description :  ''
    //     )

    useEffect(()=>{
        if(error){
            Alert.alert('An error ocurred', error, [{ text: 'Okay'}])
        }
    }, [error])
    
    //useCallback prevents re-rendering in an infinite loop
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid ){
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                {text: 'Okay'}
            ])
            return;
        }

        setError(null)
        setIsLoading(true)

        try{
            if(editedProduct){
                await dispatch(
                    productsActions.updateProduct(
                        prodId, 
                        formState.inputValues.title, 
                        formState.inputValues.description, 
                        formState.inputValues.imageUrl
                    )
                )
            }else{
                await dispatch(
                    productsActions.createProduct(
                        formState.inputValues.title, 
                        formState.inputValues.description, 
                        formState.inputValues.imageUrl, 
                        +formState.inputValues.price )
                    )
            }
            props.navigation.goBack()
        }catch (err){
            setError(err.message)
        }

        setIsLoading(false)
        
    }, [dispatch, prodId, formState])

    //useEffect executes a function after every render cycle
    useEffect(()=> {
        props.navigation.setParams({'submit': submitHandler})
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) =>{
        //fires with every keystroke
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier
         })
    }, [dispatchFormState])

    if (isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView 
            style={{flex: 1}} 
            behavior="padding" 
            keyboardVerticalOffset={100} 
        >
        <ScrollView>
            <View style={styles.form}>
            <Input 
                id = 'title'
                label = 'Title'
                errorText= 'Please enter a valid title'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next'
                onInputChange = {inputChangeHandler}
                initialValue= {editedProduct? editedProduct.title : ''}
                initiallyValid = {!!editedProduct}
                required
            />
            <Input 
                id = 'imageUrl'
                label = 'Image Url'
                errorText= 'Please enter a valid image Url'
                keyboardType='default'
                returnKeyType='next'
                onInputChange = {inputChangeHandler}
                initialValue= {editedProduct? editedProduct.imageUrl : ''}
                initiallyValid = {!!editedProduct}
                required
            />
            {editedProduct ? null: (
                <Input 
                id = 'price'
                label = 'Price'
                errorText= 'Please enter a valid price'
                keyboardType='decimal-pad'
                returnKeyType='next'
                onInputChange = {inputChangeHandler}
                required
                min={0.1}
                />
            )}
            <Input 
                id = 'description'
                label = 'Description'
                errorText= 'Please enter a valid description'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                multiline
                numberOfLines ={3}
                onInputChange = {inputChangeHandler}
                initialValue= {editedProduct? editedProduct.description : ''}
                initiallyValid = {!!editedProduct}
                required
                minLength={5}
              
            />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

EditProductScreen.navigationOptions = navData => {

    //executed after the button is pressed
    const  submitFn = navData.navigation.getParam('submit')

    return {
        headerTitle: navData.navigation.getParam('productId')
         ? 'Edit Product'
         : 'Add Product',
         headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item 
             title='Save' 
             iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
             onPress={submitFn} 
             />
         </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})

export default EditProductScreen