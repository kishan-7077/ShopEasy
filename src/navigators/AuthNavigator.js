import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";

import { ActivityIndicator, PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import { useAuth } from "../contexts/AuthContext";

export default function App() {
	const { userToken, isLoading } = useAuth();

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator animating={true} size="large" />
			</View>
		);
	}

	return (
		<Stack.Navigator>
			{userToken ? (
				<Stack.Screen name="Home" component={HomeScreen} />
			) : (
				<>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Signup" component={SignupScreen} />
				</>
			)}
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
