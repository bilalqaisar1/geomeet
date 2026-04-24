import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OtpScreen from '../screens/OtpScreen';
import BirthdayScreen from '../screens/BirthdayScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

import MainTabNavigator from './MainTabNavigator';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import FilterScreen from '../screens/FilterScreen';
import CameraScreen from '../screens/CameraScreen';
import CapturePreviewScreen from '../screens/CapturePreviewScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false, 
        animationEnabled: true,
        gestureEnabled: false, 
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      
      {/* Auth Flow Screens */}
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Birthday" component={BirthdayScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />

      {/* Onboarding Flow */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      {/* Main App - Bottom Tabs */}
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
        options={{
          gestureEnabled: false,
        }}
      />

      {/* Detail Screens */}
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      <Stack.Screen name="Filters" component={FilterScreen} />

      {/* Camera Flow */}
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="CapturePreview" component={CapturePreviewScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
