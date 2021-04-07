import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Text } from "react-native";
import { Asset } from 'expo-asset';

const cacheImages = images => 
  images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image);
  } else {
    return Asset.fromModule(image).downloadAsync();
  }
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = async () => {
      const images = cacheImages(["https://media.newyorker.com/photos/5f235208da874d6b001378a3/master/pass/Glasser-TrumpDelayTweet.jpg",
      require("./assets/splash.png")
    ]);
    console.log(images);
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


