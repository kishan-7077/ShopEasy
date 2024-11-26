import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

const Header = () => {
	const [search, setSearch] = useState("");

	return (
		<View style={styles.container}>
			{/* Status Bar */}
			<StatusBar backgroundColor="#6200EE" barStyle="light-content" />

			{/* Brand Name */}
			<View style={styles.brandContainer}>
				<Text style={styles.brandName}>ShopEasy</Text>
			</View>

			{/* Search Bar */}
			<View style={styles.searchContainer}>
				<TextInput
					mode="outlined"
					value={search}
					onChangeText={(text) => setSearch(text)}
					label="Search"
					placeholder="Search Products"
					style={styles.searchInput}
				/>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		height: 150, // Increased height for alignment
		justifyContent: "center",
		paddingHorizontal: 20, // Padding for consistent spacing
		backgroundColor: "#6200EE", // Background color for the header
	},
	brandContainer: {
		marginBottom: 10, // Space between brand name and search bar
	},
	brandName: {
		fontSize: 24, // Font size for brand name
		fontWeight: "bold", // Bold text for emphasis
		color: "#fff", // White color for text
		textAlign: "center", // Center the brand name
	},
	searchContainer: {
		width: "100%", // Full width for search input
	},
	searchInput: {
		backgroundColor: "#fff", // White background for input
		borderRadius: 10, // Rounded corners for input
	},
});
