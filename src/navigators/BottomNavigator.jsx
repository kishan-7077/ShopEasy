import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import AccountScreen from "../screens/AccountScreen";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";

const HomeRoute = () => <HomeScreen />;
const CartRoute = () => <CartScreen />;
const AccountRoute = () => <AccountScreen />;

const BottomNavigator = () => {
	const [index, setIndex] = React.useState(0);

	const [routes] = React.useState([
		{
			key: "home",
			title: "Home",
			focusedIcon: "home-account",
			unfocusedIcon: "home-outline",
		},
		{
			key: "cart",
			title: "Your Cart",
			focusedIcon: "cart-arrow-down",
			unfocusedIcon: "cart-outline",
		},
		{
			key: "account",
			title: "Account",
			focusedIcon: "account",
			unfocusedIcon: "account-outline",
		},
	]);

	const renderScene = BottomNavigation.SceneMap({
		home: HomeRoute,
		cart: CartRoute,
		account: AccountRoute,
	});

	// Ensure key is not passed to child props
	const filteredRoutes = routes.map(({ key, ...rest }) => ({ ...rest }));

	return (
		<BottomNavigation
			key={index}
			navigationState={{
				index,
				routes: routes.map(({ key, ...rest }) => ({
					key,
					...rest,
				})),
			}}
			onIndexChange={setIndex}
			renderScene={renderScene}
			shifting={true}
		/>
	);
};

export default BottomNavigator;
