import React, { useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { DotIndicator } from 'react-native-indicators'; // Import DotIndicator

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LogIn'); // Navigate to LogIn screen after 3 seconds
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.yellowBox} />

      <View style={styles.middleContainer}>
        <Image
          source={require('../../../assets/images/logo.png')} // Logo ka path yahan daalain
          style={styles.logo}
          resizeMode="contain"
        />
        <DotIndicator color="#FDD043" count={5} size={10} style={styles.loader} />
      </View>

      <View style={styles.yellowBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  yellowBox: {
    height: 30, // Adjust height as needed
    width: '100%',
    backgroundColor: '#FDD043',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250, // Adjust size as needed
    height: 250,
    marginBottom: 20, // Space between logo and loader
  },
  loader: {
    marginTop: 20, // Space between logo and loader
  },
});
