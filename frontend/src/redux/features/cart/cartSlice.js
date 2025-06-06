import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        selectedItems: 0,
        totalPrice: 0,
        tax: 0,
        taxRate: 0.05,
        grandTotal: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.items.some(item => item.id === action.payload.id)

            if (!isExist) {
                state.items.push({ ...action.payload, quantity: 1 })
            } else {
                console.log('Item already in cart')
            }

            state.selectedItems = setSelectedItems(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)
        },
        updateQuantity: (state, action) => {
            const items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    if (action.payload.type === 'increment') {
                        item.quantity += 1
                    } else if (action.payload.type === 'decrement' && item.quantity > 1) {
                        item.quantity -= 1
                    }

                }
                return item
            })

            state.selectedItems = setSelectedItems(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id)
            state.selectedItems = setSelectedItems(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)
        },
        clearCart: (state) => {
            state.items = []
            state.selectedItems = 0
            state.totalPrice = 0
            state.tax = 0
            state.grandTotal = 0
        }
    },
})

// utilties function
export const setSelectedItems = (state) => state.items.reduce((total, item) => {
    return Number(total + item.quantity)
}, 0)

export const setTotalPrice = (state) => state.items.reduce((total, item) => {
    return Number(total + item.quantity * item.price)
}, 0)

export const setTax = (state) => setTotalPrice(state) * state.taxRate

export const setGrandTotal = (state) => {
    return setTotalPrice(state) + setTotalPrice(state) * state.taxRate
}

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
