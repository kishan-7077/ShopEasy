import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Snackbar, TextInput } from "react-native-paper";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

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
			navigation.navigate("Home");
		} catch (error) {
			onToggleSnackbar();
			console.log("Error in Login");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<TextInput
					mode="outlined"
					label="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					placeholder="Enter email"
					keyboardType="email-address"
				/>
				<TextInput
					mode="outlined"
					label="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					placeholder="Enter password"
					secureTextEntry
				/>
				<Button
					mode="contained"
					onPress={() => {
						handleLoginPress(email, password);
					}}
				>
					Login
				</Button>
				<Button mode="contained" onPress={() => navigation.navigate("Signup")}>
					Signup
				</Button>
			</View>
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

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	innerContainer: {
		width: 300,
	},
	snackbar: {
		marginBottom: 50,
	},
});
