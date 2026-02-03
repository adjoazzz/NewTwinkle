// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from "./src/screens/HomeScreen";
import PinterestInputScreen from "./src/screens/PinterestInputScreen";
import CollectionScreen from "./src/screens/CollectionScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Recoleta': require('./assets/fonts/Recoleta-RegularDEMO.otf'),
          'NeueMontreal': require('./assets/fonts/NeueMontreal-Regular.ttf'),
          'NeueMontreal-Bold': require('./assets/fonts/NeueMontreal-Bold.ttf'),
        });
      } catch (e) {
        console.warn('Font loading error:', e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Show nothing until fonts are loaded
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PinterestInput" component={PinterestInputScreen} />
        <Stack.Screen name="Collection" component={CollectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}