import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./src/screens/landing/Landing";
import Asteroid from "./src/screens/Asteroid/Asteroid";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Asteroid" component={Asteroid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
