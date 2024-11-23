import { NavigationContainer } from "@react-navigation/native";

import { PaperProvider } from "react-native-paper";

import AuthNavigator from "./navigators/AuthNavigator";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
	return (
		<AuthProvider>
			<PaperProvider>
				<NavigationContainer>
					<AuthNavigator />
				</NavigationContainer>
			</PaperProvider>
		</AuthProvider>
	);
}
