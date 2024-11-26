import { NavigationContainer } from "@react-navigation/native";

import { PaperProvider } from "react-native-paper";

import AuthNavigator from "./navigators/AuthNavigator";
import { AuthProvider } from "./contexts/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
	return (
		<AuthProvider>
			<PaperProvider>
				<Provider store={store}>
					<NavigationContainer>
						<AuthNavigator />
					</NavigationContainer>
				</Provider>
			</PaperProvider>
		</AuthProvider>
	);
}
