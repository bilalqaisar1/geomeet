import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

const { height } = Dimensions.get('window');

const AuthBackground = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* Top Background Image Section */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../assets/auth_bg.png')}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Soft gradient overlay to blend image into the dark content area */}
        <View style={styles.gradientOverlay} />
      </View>

      {/* Bottom Content Area */}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F', // Very dark background behind the content
  },
  imageContainer: {
    height: height * 0.55, // Image takes up top 55% of the screen
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: 'rgba(15, 15, 15, 0.4)', // Fades image into content
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30, // Safe area padding
  },
});

export default AuthBackground;
