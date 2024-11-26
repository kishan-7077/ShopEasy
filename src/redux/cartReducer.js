import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the cart
const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		// Add product to cart or increase quantity if it already exists
		addToCart(state, action) {
			const existingProduct = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (existingProduct) {
				existingProduct.quantity += 1; // Increase quantity if the product is already in the cart
			} else {
				state.items.push({ ...action.payload, quantity: 1 }); // Otherwise, add the product with quantity 1
			}
		},
		// Remove product from cart
		removeFromCart(state, action) {
			state.items = state.items.filter((item) => item.id !== action.payload); // Remove product by id
		},
		// Increment quantity of a product in the cart
		incrementQuantity(state, action) {
			const existingProduct = state.items.find(
				(item) => item.id === action.payload
			);
			if (existingProduct) {
				existingProduct.quantity += 1; // Increment the quantity by 1
			}
		},
		// Decrement quantity of a product in the cart
		decrementQuantity(state, action) {
			const existingProduct = state.items.find(
				(item) => item.id === action.payload
			);
			if (existingProduct && existingProduct.quantity > 1) {
				existingProduct.quantity -= 1; // Decrease the quantity by 1, but ensure it doesn't go below 1
			}
		},
	},
});

// Export actions and reducer
export const {
	addToCart,
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
