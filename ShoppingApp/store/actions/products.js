export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = productID => {
    return {
        type: DELETE_PRODUCT,  pid: productID
    }
}