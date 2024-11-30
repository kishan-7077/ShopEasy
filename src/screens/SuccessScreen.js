import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

const SuccessScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Payment Successful!</Text>
			<Text style={styles.message}>
				Thank you for your payment. Your order has been placed successfully.
			</Text>
			<Button
				mode="contained"
				style={styles.button}
				labelStyle={styles.buttonLabel}
				onPress={() => navigation.navigate("Checkout")}
			>
				Go Back to Shop
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#4CAF50",
		marginBottom: 20,
	},
	message: {
		fontSize: 18,
		textAlign: "center",
		color: "#333",
		marginBottom: 30,
	},
	button: {
		backgroundColor: "#6200EE",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	buttonLabel: {
		color: "#FFFFFF",
		fontSize: 16,
	},
});

export default SuccessScreen;
