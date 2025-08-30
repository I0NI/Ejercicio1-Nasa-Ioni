import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PhotoDetail from "./screens/PhotoDetail";
import { useFonts, Orbitron_700Bold } from "@expo-google-fonts/orbitron";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({ Orbitron_700Bold });
  if (!fontsLoaded) {
    return (
      <Text style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>
        Cargando fuentes…
      </Text>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0b1a2b" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "Orbitron_700Bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhotoDetail"
          component={PhotoDetail}
          options={{ title: "Vista previa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
