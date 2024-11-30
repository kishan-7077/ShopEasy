import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, Button, Appbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
} from "../redux/cartReducer"; // Import actions
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.items);

	const navigation = useNavigation();

	// Calculate total price
	const getTotalPrice = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	// Handle removing product from cart
	const handleRemoveFromCart = (productId) => {
		dispatch(removeFromCart(productId)); // Dispatch action to remove product from cart
	};

	// Handle incrementing product quantity
	const handleIncrementQuantity = (productId) => {
		dispatch(incrementQuantity(productId)); // Dispatch action to increment quantity
	};

	// Handle decrementing product quantity
	const handleDecrementQuantity = (productId) => {
		dispatch(decrementQuantity(productId)); // Dispatch action to decrement quantity
	};

	// Handle proceed to checkout (for now, we just log it)
	const handleProceedToCheckout = () => {
		console.log("Proceeding to checkout");
		navigation.navigate("Checkout");
		// You can navigate to a checkout screen here if you have one.
	};

	return (
		<>
			<Appbar.Header style={styles.header}>
				<Appbar.Content title="ShopEasy" titleStyle={styles.brandName} />
			</Appbar.Header>

			<ScrollView style={styles.container}>
				{cart.length === 0 ? (
					<Paragraph style={styles.emptyCartText}>Your cart is empty</Paragraph>
				) : (
					cart.map((product) => (
						<Card key={product.id} style={styles.card}>
							<Card.Cover
								source={{ uri: product.image }}
								style={styles.cardImage}
							/>
							<Card.Content>
								<Title style={styles.productName}>{product.name}</Title>
								<Paragraph style={styles.price}>
									₹ {product.price.toFixed(2)} x {product.quantity} = $
									{(product.price * product.quantity).toFixed(2)}
								</Paragraph>
							</Card.Content>

							<Card.Actions style={styles.cartActions}>
								<Button
									mode="outlined"
									onPress={() => handleDecrementQuantity(product.id)} // Decrement quantity
									disabled={product.quantity <= 1} // Prevent decrement if quantity is 1
									buttonColor="#ff1744" // Red color
									textColor="#ff1744"
								>
									-
								</Button>

								<Button
									mode="outlined"
									onPress={() => handleIncrementQuantity(product.id)} // Increment quantity
									buttonColor="#00e676" // Green color
									textColor="#ffffff"
								>
									+
								</Button>

								<Button
									mode="contained"
									onPress={() => handleRemoveFromCart(product.id)} // Remove from cart
									labelStyle={styles.removeButtonText}
									buttonColor="#e53935" // Red color
									textColor="#ffffff"
								>
									Remove
								</Button>
							</Card.Actions>
						</Card>
					))
				)}
			</ScrollView>
			{cart.length > 0 && (
				<View style={styles.totalPriceContainer}>
					<Paragraph style={styles.totalPriceText}>
						Total Price: ₹ {getTotalPrice().toFixed(2)}
					</Paragraph>
					<Button
						mode="contained"
						onPress={handleProceedToCheckout}
						style={styles.checkoutButton}
						labelStyle={styles.checkoutButtonText}
					>
						Proceed to Checkout
					</Button>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#6200EE",
	},
	brandName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#ffffff",
	},
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	emptyCartText: {
		fontSize: 20,
		color: "#757575",
		textAlign: "center",
		marginTop: 50,
	},
	card: {
		marginBottom: 20,
		borderRadius: 15,
		elevation: 3,
		backgroundColor: "#ffffff",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},
	cardImage: {
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		height: 200,
	},
	productName: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#212121",
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#388e3c",
		marginTop: 5,
	},
	cartActions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
	},
	removeButtonText: {
		color: "#fff",
	},
	totalPriceContainer: {
		marginTop: 20,
		paddingVertical: 20,
		paddingHorizontal: 15,
		backgroundColor: "#ffffff",
		borderRadius: 10,
		elevation: 5,
		marginBottom: 30,
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	totalPriceText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#212121",
		textAlign: "center",
		marginBottom: 15,
	},
	checkoutButton: {
		backgroundColor: "#6200EE",
		paddingVertical: 12,
		borderRadius: 8,
	},
	checkoutButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default CartScreen;
