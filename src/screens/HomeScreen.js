import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Products from "../components/Products";

const HomeScreen = () => {
	return (
		<>
			<SafeAreaView>
				<Header />
			</SafeAreaView>
			<View style={styles.container}>
				<Products />
			</View>
		</>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 2,
	},
});
