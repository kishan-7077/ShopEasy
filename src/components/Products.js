import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, Button, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
} from "../redux/cartReducer"; // Import actions

import products from "../utils/data"; // Ensure the path to your products data is correct.

const ProductsScreen = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.items);

	// Snackbar state management
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	// Function to check if product is already in the cart
	const isProductInCart = (productId) => {
		return cart.some((item) => item.id === productId);
	};

	// Get the quantity of the product in the cart
	const getProductQuantity = (productId) => {
		const productInCart = cart.find((item) => item.id === productId);
		return productInCart ? productInCart.quantity : 0;
	};

	// Handle adding product to cart
	const handleAddToCart = (product) => {
		if (isProductInCart(product.id)) {
			setSnackbarMessage(`${product.name} is already in the cart.`);
			setSnackbarVisible(true);
		} else {
			dispatch(addToCart(product)); // Dispatch action to add to cart
			setSnackbarMessage(`${product.name} added to cart!`);
			setSnackbarVisible(true);
		}
	};

	// Handle removing product from cart
	const handleRemoveFromCart = (product) => {
		dispatch(removeFromCart(product.id)); // Dispatch action to remove product from cart
		setSnackbarMessage(`${product.name} removed from cart!`);
		setSnackbarVisible(true);
	};

	// Handle incrementing product quantity
	const handleIncrementQuantity = (productId) => {
		dispatch(incrementQuantity(productId)); // Dispatch action to increment quantity
	};

	// Handle decrementing product quantity
	const handleDecrementQuantity = (productId) => {
		dispatch(decrementQuantity(productId)); // Dispatch action to decrement quantity
	};

	return (
		<ScrollView style={styles.container}>
			{products.map((product) => (
				<Card key={product.id} style={styles.card}>
					<Card.Cover
						source={{ uri: product.image }}
						style={styles.cardImage}
					/>
					<Card.Content>
						<Title style={styles.productName}>{product.name}</Title>
						<Paragraph style={styles.productDescription}>
							{product.description}
						</Paragraph>
						<Paragraph style={styles.price}>
							₹ {product.price.toFixed(2)}
						</Paragraph>
						<Paragraph style={styles.rating}>
							Rating: {product.rating} ⭐
						</Paragraph>

						{/* Conditionally render quantity if product is in the cart */}
						{isProductInCart(product.id) && (
							<Paragraph style={styles.quantity}>
								Quantity: {getProductQuantity(product.id)}
							</Paragraph>
						)}
					</Card.Content>

					<Card.Actions style={{ marginHorizontal: 10 }}>
						{/* Check if product is in cart and display actions */}
						{isProductInCart(product.id) ? (
							<View style={styles.cartActions}>
								<Button
									mode="outlined"
									onPress={() => handleDecrementQuantity(product.id)} // Decrement quantity
									disabled={getProductQuantity(product.id) <= 1} // Prevent decrement if quantity is 1
									buttonColor="red"
									textColor="red"
								>
									-
								</Button>

								<Button
									mode="outlined"
									onPress={() => handleIncrementQuantity(product.id)} // Increment quantity
									buttonColor="green"
									textColor="#ffffff"
								>
									+
								</Button>

								<Button
									mode="contained"
									onPress={() => handleRemoveFromCart(product)}
									labelStyle={styles.removeButtonText}
									buttonColor="#e53935"
									textColor="#ffffff"
								>
									Remove from Cart
								</Button>
							</View>
						) : (
							<Button
								mode="contained"
								onPress={() => handleAddToCart(product)}
								style={styles.addButton}
								labelStyle={styles.addButtonText}
							>
								Add to Cart
							</Button>
						)}
					</Card.Actions>
				</Card>
			))}

			{/* Snackbar component to show temporary messages */}
			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				action={{
					label: "Close",
					onPress: () => setSnackbarVisible(false),
				}}
				duration={3000} // Optional: Snackbar will auto-dismiss after 3 seconds
			>
				{snackbarMessage}
			</Snackbar>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: "#f9f9f9",
	},
	card: {
		marginBottom: 15,
		borderRadius: 10,
		elevation: 5,
	},
	cardImage: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		height: 200,
	},
	productName: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
	},
	productDescription: {
		fontSize: 14,
		color: "#666",
		marginTop: 5,
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#2e7d32",
		marginTop: 5,
	},
	rating: {
		fontSize: 14,
		color: "#888",
		marginTop: 5,
	},
	quantity: {
		fontSize: 16,
		marginTop: 5,
		color: "green",
	},
	cartActions: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 10,
		gap: 10,
	},
	addButton: {
		backgroundColor: "#1976d2",
		paddingVertical: 10,
		borderRadius: 5,
	},
	addButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
	removeButtonText: {
		color: "#fff",
	},
});

export default ProductsScreen;
