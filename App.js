import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Text, Image } from "react-native";
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

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
      const images = cacheImages(["https://media.newyorker.com/photos/5f235208da874d6b001378a3/master/pass/Glasser-TrumpDelayTweet.jpg",
      require("./assets/splash.png")
    ]);
    const fonts = cacheFonts([Ionicons.font]);
    return Promise.all([...images, ...fonts]);
  };
  const onFinish = () => setIsReady(true);
  return isReady ? <Text>준비됐나?</Text> : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish} 
      onError={console.error} 
    />
  );
}


