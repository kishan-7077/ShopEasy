import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-native-paper";

const HomeScreen = () => {
	const { userToken, logout } = useAuth();
	const [userDetails, setUserDetails] = useState(null);

	useEffect(() => {
		const fetchUserDetails = async (req, res) => {
			try {
				const response = await axios.get(
					"http://192.168.1.7:5000/user/isAuthorized",
					{
						headers: {
							authorization: `Bearer ${userToken}`,
						},
					}
				);
				console.log(response.data.userId);

				// set details for the logged in user
				const userId = response.data.userId;

				try {
					const response = await axios.post(
						"http://192.168.1.7:5000/user/details",
						{ _id: userId }
					);
					console.log(response.data);

					setUserDetails(response.data);
				} catch (error) {
					console.error("Error in fetching userdetails", error);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserDetails();
	}, []);

	return (
		<View style={styles.container}>
			{userDetails ? (
				<>
					<Text>Email: {userDetails.email}</Text>
					<Text>Username: {userDetails.userName}</Text>
					<Text>User ID: {userDetails.userId}</Text>
					<Button mode="contained" onPress={logout}>
						Logout
					</Button>
				</>
			) : (
				<Text>Loading user details...</Text>
			)}
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
