import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

import LoginScreen from "../screens/LoginScreen";

import SignupScreen from "../screens/SignupScreen";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import BottomNavigator from "./BottomNavigator";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CheckoutScreen from "../screens/CheckoutScreen";
import SuccessScreen from "../screens/SuccessScreen";
import CartScreen from "../screens/CartScreen";

const Tab = createBottomTabNavigator();

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
			{/* Conditional Rendering Based on Authentication */}
			{userToken ? (
				<>
					<Stack.Screen
						name="Home"
						component={BottomNavigator}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Checkout"
						component={CheckoutScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Success"
						component={SuccessScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Cart"
						component={CartScreen}
						options={{ headerShown: false }}
					/>
				</>
			) : (
				<>
					{/* Login Screen Header Styling */}
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{
							title: "Login",
							headerStyle: {
								backgroundColor: "#6200EE", // Purple background color
							},
							headerTintColor: "#fff", // White text color for the header
							headerTitleStyle: {
								fontWeight: "bold", // Bold title text
								fontSize: 24, // Larger font size for title
							},
						}}
					/>

					{/* Signup Screen Header Styling */}
					<Stack.Screen
						name="Signup"
						component={SignupScreen}
						options={{
							title: "Sign Up",
							headerStyle: {
								backgroundColor: "#6200EE", // Purple background color
							},
							headerTintColor: "#fff", // White text color for the header
							headerTitleStyle: {
								fontWeight: "bold", // Bold title text
								fontSize: 24, // Larger font size for title
							},
						}}
					/>
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
