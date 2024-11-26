import React, { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userToken, setUserToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const login = async (token) => {
		try {
			await AsyncStorage.setItem("userToken", token);
			setUserToken(token);
		} catch (error) {
			console.error("Error saving token to AsyncStorage:", error);
		}
	};

	const logout = async () => {
		try {
			await AsyncStorage.removeItem("userToken");
			setUserToken(null);
		} catch (error) {
			console.error("Error removing token from AsyncStorage:", error);
		}
	};

	const loadToken = async () => {
		try {
			const token = await AsyncStorage.getItem("userToken");
			if (token) {
				setUserToken(token);
			}
		} catch (error) {
			console.error("Error loading token from AsyncStorage:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadToken();
	}, []);

	return (
		<AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
