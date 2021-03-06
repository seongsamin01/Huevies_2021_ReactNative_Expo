import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Image, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Stack from "./navigation/Stack";


const cacheImages = images => 
  images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image);
  } else {
    return Asset.fromModule(image).downloadAsync();
  }
});

const cacheFonts = fonts => fonts.map(font => [Font.loadAsync(font), Font.loadAsync(font)]);

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = () => {
      const images = cacheImages([
        "https://images.unsplash.com/photo-1501951653466-8df816debe46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80",
      require("./assets/splash.png")
    ]);
    const fonts = cacheFonts([Ionicons.font, FontAwesome.font]);
    return Promise.all([...images, ...fonts]);
  };
  const onFinish = () => setIsReady(true);
  return isReady ? (
    <>
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
    <StatusBar barStyle="light-content" />
    </>
    ) : (
      <AppLoading
        startAsync={loadAssets}
        onFinish={onFinish} 
        onError={console.error} 
    />
  );
}


