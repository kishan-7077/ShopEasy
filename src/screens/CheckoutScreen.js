import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button } from "react-native-paper"; // Using react-native-paper for styled buttons
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CheckoutScreen = () => {
	const { userToken } = useAuth();
	const [userDetails, setUserDetails] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchUserDetails = async () => {
			console.log(userToken);
			try {
				const response = await axios.get(
					"http://192.168.114.110:5000/user/isAuthorized",
					{
						headers: {
							authorization: `Bearer ${userToken}`,
						},
					}
				);
				const userId = response.data.userId;

				try {
					const userResponse = await axios.post(
						"http://192.168.114.110:5000/user/details",
						{ _id: userId }
					);
					setUserDetails(userResponse.data);
				} catch (error) {
					console.error("Error fetching user details:", error);
				}
			} catch (error) {
				console.error("Authorization failed:", error);
			}
		};
		fetchUserDetails();
	}, [userToken]);

	const cart = useSelector((state) => state.cart.items);

	// Calculate total price
	const getTotalPrice = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const amount = getTotalPrice(); // Amount in INR (for display)
	const amountInPaisa = amount * 100; // Convert to paisa for Razorpay

	const handlePayment = async () => {
		const paymentOptions = {
			key: "rzp_test_Z3WvmwtiljK1Zz", // Replace with your Razorpay Key ID
			amount: amountInPaisa, // Amount in paisa
			currency: "INR",
			name: "ShopEasy",
			description: "Order Payment",
			image:
				"https://res.cloudinary.com/dii6q6ufe/image/upload/v1732879550/d6a2ufosx4lz1nlfx7ds.png", // Replace with your logo URL
			prefill: {
				name: userDetails.name,
				email: userDetails.email,
				contact: "9876543210",
			},
			theme: { color: "#6200EE" },
		};

		// Construct payment URL
		const paymentUrl = `https://api.razorpay.com/v1/checkout/embedded?key_id=${
			paymentOptions.key
		}&amount=${paymentOptions.amount}&currency=${
			paymentOptions.currency
		}&name=${encodeURIComponent(
			paymentOptions.name
		)}&description=${encodeURIComponent(
			paymentOptions.description
		)}&image=${encodeURIComponent(paymentOptions.image)}&prefill[email]=${
			paymentOptions.prefill.email
		}&prefill[contact]=${
			paymentOptions.prefill.contact
		}&theme[color]=${encodeURIComponent(paymentOptions.theme.color)}`;

		// Open Razorpay checkout using `openAuthSessionAsync`
		try {
			const result = await WebBrowser.openAuthSessionAsync(paymentUrl);

			if (result.type === "dismiss") {
				// User pressed back or closed the web view
				navigation.replace("Cart");
			} else if (result.type === "success") {
				// Payment was successful
				navigation.navigate("Success");
			}
		} catch (error) {
			Alert.alert("Payment Error", error.message);
			navigation.navigate("CartScreen");
		}

		console.log("Payment Result:", result);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Checkout</Text>
			<Text style={styles.amountText}>Total Amount: ₹ {amount.toFixed(2)}</Text>
			<Button
				mode="contained"
				onPress={handlePayment}
				style={styles.payButton}
				labelStyle={styles.payButtonLabel}
			>
				Pay Now
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#6200EE",
	},
	amountText: {
		fontSize: 20,
		marginBottom: 30,
		color: "#333333",
	},
	payButton: {
		backgroundColor: "#6200EE",
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 8,
	},
	payButtonLabel: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFFFFF",
	},
});

export default CheckoutScreen;
