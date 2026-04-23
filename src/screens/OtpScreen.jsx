import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AuthBackground from '../components/AuthBackground';
import GeoMeetHeader from '../components/GeoMeetHeader';
import CustomButton from '../components/CustomButton';
import OtpInput from '../components/OtpInput';
import { authService } from '../services/authService';

const OtpScreen = ({ route, navigation }) => {
  const { phone, isSignUp } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Mask the phone number for display (e.g. *** *** ** *78)
  const maskedPhone = phone.length > 2 
    ? `*** *** ** *${phone.slice(-2)}` 
    : phone;

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code.');
      return;
    }

    setLoading(true);
    try {
      const { session, error } = await authService.verifyOtp(phone, otp);

      if (error) {
        throw error;
      }

      if (session) {
        // If it's a sign-up flow, take them to the Birthday setup screen
        if (isSignUp) {
          navigation.replace('Birthday');
        } else {
          // If login, take them to onboarding
          navigation.replace('Onboarding');
        }
      }
    } catch (err) {
      Alert.alert('Verification Failed', err.message || 'Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    try {
      await authService.sendOtp(phone);
      setCountdown(30); // Reset timer
      Alert.alert('Success', 'A new code has been sent.');
    } catch (err) {
      Alert.alert('Error', 'Failed to resend code.');
    }
  };

  // Format countdown as MM.SS (e.g. 00.30)
  const formatTime = (seconds) => {
    return `00.${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <AuthBackground>
      <GeoMeetHeader showBack={true} />
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Verify your number</Text>
        <Text style={styles.subtitle}>
          Please enter the verification code we sent to your mobile {maskedPhone}
        </Text>

        <OtpInput value={otp} onChangeText={setOtp} />

        <CustomButton
          title="Verify"
          onPress={handleVerify}
          loading={loading}
          disabled={otp.length !== 6}
          style={styles.button}
        />

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            I didn't receive a code. {' '}
            <Text 
              style={[styles.resendLink, countdown > 0 && styles.resendLinkDisabled]} 
              onPress={handleResend}
            >
              Resend
            </Text>
          </Text>
          <Text style={styles.timerText}>{formatTime(countdown)}</Text>
        </View>
      </View>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#D1D1D1',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  resendText: {
    color: '#FFF',
    fontSize: 14,
  },
  resendLink: {
    color: '#E8587A',
    textDecorationLine: 'underline',
  },
  resendLinkDisabled: {
    color: '#666',
    textDecorationLine: 'none',
  },
  timerText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default OtpScreen;
