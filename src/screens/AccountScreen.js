import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const AccountScreen = () => {
	const { userToken, logout } = useAuth();
	const [userDetails, setUserDetails] = useState(null);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const response = await axios.get(
					"http://192.168.1.7:5000/user/isAuthorized",
					{
						headers: {
							authorization: `Bearer ${userToken}`,
						},
					}
				);
				const userId = response.data.userId;

				try {
					const userResponse = await axios.post(
						"http://192.168.1.7:5000/user/details",
						{ _id: userId }
					);
					setUserDetails(userResponse.data);
				} catch (error) {
					console.error("Error fetching user details:", error);
				}
			} catch (error) {
				console.error("Authorization failed:", error);
			}
		};
		fetchUserDetails();
	}, [userToken]);

	return (
		<View style={styles.container}>
			{userDetails ? (
				<Card style={styles.profileCard}>
					<Card.Content style={styles.profileContent}>
						{/* Profile Picture */}
						<Image
							source={{
								uri:
									userDetails.profilePicture ||
									"https://via.placeholder.com/150", // Default placeholder image
							}}
							style={styles.profileImage}
						/>
						<Title style={styles.profileTitle}>{userDetails.userName}</Title>
						<Paragraph style={styles.profileEmail}>
							{userDetails.email}
						</Paragraph>

						{/* User ID */}
						<Text style={styles.userIdText}>User ID: {userDetails.userId}</Text>
					</Card.Content>

					<Card.Actions style={styles.cardActions}>
						<Button
							mode="contained"
							onPress={logout}
							style={styles.logoutButton}
						>
							Logout
						</Button>
					</Card.Actions>
				</Card>
			) : (
				<Text style={styles.loadingText}>Loading user details...</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#f4f6f9",
	},
	profileCard: {
		width: "100%",
		borderRadius: 12,
		elevation: 5,
	},
	profileContent: {
		alignItems: "center",
		paddingVertical: 20,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	profileTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#333",
	},
	profileEmail: {
		fontSize: 16,
		color: "#777",
		marginBottom: 10,
	},
	userIdText: {
		fontSize: 14,
		color: "#888",
	},
	cardActions: {
		justifyContent: "center",
		paddingVertical: 10,
	},
	logoutButton: {
		backgroundColor: "#ff3b30", // Vibrant color for the logout button
		paddingVertical: 12,
		borderRadius: 25,
		width: "80%",
		alignSelf: "center",
	},
	loadingText: {
		fontSize: 18,
		color: "#555",
		textAlign: "center",
	},
});

export default AccountScreen;
