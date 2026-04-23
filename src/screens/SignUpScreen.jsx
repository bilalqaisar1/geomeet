import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AuthBackground from '../components/AuthBackground';
import GeoMeetHeader from '../components/GeoMeetHeader';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { authService } from '../services/authService';

const SignUpScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    if (!phone) {
      setError('Failed to send code, Please enter a valid phone number');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // In production, format this safely
      const formattedPhone = phone.startsWith('+') ? phone : `+1${phone}`; 
      
      const { error: authError } = await authService.sendOtp(formattedPhone);

      if (authError) {
        throw authError; // This will trigger the catch block and show error on UI like SU-3
      }

      // Pass phone and flag to next screen so it knows what to do after OTP
      navigation.navigate('Otp', { phone: formattedPhone, isSignUp: true });
    } catch (err) {
      setError('Failed to send code, Please enter a valid phone number');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <GeoMeetHeader showBack={true} />
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Just your Number. No Password.</Text>

        <CustomInput
          value={phone}
          onChangeText={(v) => { setPhone(v); setError(''); }}
          placeholder="(000) 000 0000"
          keyboardType="phone-pad"
          isPhone={true}
          error={error}
        />

        <View style={styles.infoContainer}>
          {error ? null : (
             <Text style={styles.infoText}>We'll send you a one-time verification code.</Text>
          )}
        </View>

        <CustomButton
          title="Send Code"
          onPress={handleSendCode}
          loading={loading}
          style={styles.button}
        />

        <TouchableOpacity 
          style={styles.signInContainer}
          onPress={() => navigation.navigate('SignIn')}
        >
           <Text style={styles.signInText}>Already have an account? <Text style={styles.link}>Log In</Text></Text>
        </TouchableOpacity>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D1D1',
    marginBottom: 30,
  },
  infoContainer: {
      height: 30,
      justifyContent: 'center',
      marginBottom: 10,
  },
  infoText: {
      color: '#FFF',
      fontSize: 14,
  },
  button: {
    marginTop: 0,
  },
  signInContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  signInText: {
    color: '#D1D1D1',
    fontSize: 14,
  },
  link: {
    color: '#E8587A',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
