import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput, Button, Snackbar } from "react-native-paper";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";

const SignupScreen = ({ navigation }) => {
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userName, setUserName] = useState("");
	const [isSnackbarVisible, setIsSnackvarVisible] = useState(false);

	const onToggleSnackbar = () => setIsSnackvarVisible(!isSnackbarVisible);

	const onDismissSnackbar = () => setIsSnackvarVisible(false);

	const handleSignupPress = async (userName, email, password) => {
		try {
			const response = await axios.post(
				"http://192.168.114.110:5000/user/signup",
				{
					userName: userName,
					email: email,
					password: password,
				}
			);
			console.log(response.data);
			login(response.data.token);

			// navigation.navigate("Home");
		} catch (error) {
			onToggleSnackbar();
			console.log("Error in Signup");
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar style="light" />

			<View style={styles.innerContainer}>
				{/* Brand Name - ShopEasy */}
				<Text style={styles.brandName}>ShopEasy</Text>

				<TextInput
					mode="outlined"
					label="Username"
					value={userName}
					onChangeText={(text) => setUserName(text)}
					placeholder="Enter a unique Username"
					style={styles.input}
				/>
				<TextInput
					mode="outlined"
					label="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					placeholder="Enter email"
					keyboardType="email-address"
					style={styles.input}
				/>
				<TextInput
					mode="outlined"
					label="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					placeholder="Enter password"
					secureTextEntry
					style={styles.input}
				/>
				<Button
					mode="contained"
					onPress={() => handleSignupPress(userName, email, password)}
					style={styles.signupButton}
				>
					Signup
				</Button>
			</View>

			{/* Snackbar for Error */}
			<Snackbar
				style={styles.snackbar}
				visible={isSnackbarVisible}
				onDismiss={onDismissSnackbar}
				action={{
					label: "Dismiss",
					onPress: () => {
						onDismissSnackbar();
					},
				}}
			>
				Invalid Credentials
			</Snackbar>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f4f6f9", // Soft background color
		padding: 20,
	},
	innerContainer: {
		width: "100%",
		maxWidth: 350,
		paddingHorizontal: 20,
	},
	brandName: {
		fontSize: 36, // Large font size for the brand name
		fontWeight: "bold", // Bold text
		color: "#6200EE", // Vibrant purple color for the brand
		marginBottom: 30, // Adds space below the brand name
		textAlign: "center", // Center-align the brand name
	},
	input: {
		marginBottom: 15,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	signupButton: {
		backgroundColor: "#6200EE", // Vibrant purple for the signup button
		paddingVertical: 12,
		borderRadius: 10,
		elevation: 3, // Adds shadow to button for raised effect
		marginTop: 10,
	},
	snackbar: {
		marginBottom: 50,
		backgroundColor: "#FF5722", // Error color for snackbar
		borderRadius: 10,
	},
});

export default SignupScreen;
