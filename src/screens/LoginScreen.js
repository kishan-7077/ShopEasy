import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { Button, Snackbar, TextInput } from "react-native-paper";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const LoginScreen = ({ navigation }) => {
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSnackbarVisible, setIsSnackvarVisible] = useState(false);

	const onToggleSnackbar = () => setIsSnackvarVisible(!isSnackbarVisible);

	const onDismissSnackbar = () => setIsSnackvarVisible(false);

	const handleLoginPress = async (email, password) => {
		try {
			const response = await axios.post("http://192.168.1.7:5000/user/login", {
				email: email,
				password: password,
			});
			console.log(response.data);
			login(response.data.token);
			// navigation.navigate("Home");
		} catch (error) {
			onToggleSnackbar();
			console.log("Error in Login");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.innerContainer}>
				{/* Brand Name - ShopEasy */}
				<Text style={styles.brandName}>ShopEasy</Text>

				<TextInput
					mode="outlined"
					label="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					placeholder="Enter your email"
					keyboardType="email-address"
					style={styles.input}
				/>
				<TextInput
					mode="outlined"
					label="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					placeholder="Enter your password"
					secureTextEntry
					style={styles.input}
				/>
				<Button
					mode="contained"
					onPress={() => {
						handleLoginPress(email, password);
					}}
					style={styles.loginButton}
				>
					Login
				</Button>
				<Button
					mode="outlined"
					onPress={() => navigation.navigate("Signup")}
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
		</SafeAreaView>
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
	loginButton: {
		backgroundColor: "#6200EE", // Vibrant purple color
		paddingVertical: 12,
		borderRadius: 10,
	},
	signupButton: {
		marginTop: 10,
		borderColor: "#6200EE", // Outline color for signup button
		borderWidth: 1,
		paddingVertical: 12,
		borderRadius: 10,
	},
	snackbar: {
		marginBottom: 50,
		backgroundColor: "#FF5722", // Vibrant red color for error snackbar
		borderRadius: 10,
	},
});

export default LoginScreen;
