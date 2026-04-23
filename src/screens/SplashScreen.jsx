import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    // 1. Start Fade In
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // 2. Set timeout for navigation
    const timer = setTimeout(() => {
      // 3. Start Fade Out before navigating
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(async () => {
        // Check if user is already logged in
        try {
          const { supabase } = require('../services/supabaseClient');
          const { data } = await supabase.auth.getSession();
          if (data?.session) {
             navigation.replace('MainTabs');
          } else {
             navigation.replace('SignIn');
          }
        } catch (e) {
           navigation.replace('SignIn');
        }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.Image
        source={require('../assets/splash.png')}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background to avoid white flash
  },
  logo: {
    width: width,
    height: height,
    position: 'absolute',
  },
});

export default SplashScreen;
