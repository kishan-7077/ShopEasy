import { StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput, Button, Snackbar } from "react-native-paper";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

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
			const response = await axios.post("http://192.168.1.7:5000/user/signup", {
				userName: userName,
				email: email,
				password: password,
			});
			console.log(response.data);

			login(response.data.token);

			navigation.navigate("Home");
		} catch (error) {
			onToggleSnackbar();
			console.log("Error in Signup");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<TextInput
					mode="outlined"
					label="Username"
					value={userName}
					onChangeText={(text) => setUserName(text)}
					placeholder="Enter a unique Username"
					keyboardType="email-address"
				/>
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
					onPress={() => handleSignupPress(userName, email, password)}
				>
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

export default SignupScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	innerContainer: {
		width: 300,
	},
});
