import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AuthBackground from '../components/AuthBackground';
import GeoMeetHeader from '../components/GeoMeetHeader';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { authService } from '../services/authService';

const SignInScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(true);

  const handleLogin = async () => {
    if (!phone) {
      setError('Please enter a valid phone number');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // In production, format this safely (e.g., ensure it starts with '+')
      // Supabase requires E.164 format: +1234567890
      const formattedPhone = phone.startsWith('+') ? phone : `+1${phone}`; 
      
      const { error: authError } = await authService.sendOtp(formattedPhone);

      if (authError) {
        throw authError;
      }

      // Pass phone to next screen
      navigation.navigate('Otp', { phone: formattedPhone, isSignUp: false });
    } catch (err) {
      setError(err.message || 'Failed to send code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <GeoMeetHeader showBack={false} />
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Log in to GeoMeet</Text>
        <Text style={styles.subtitle}>Just your Number. No Password.</Text>

        <CustomInput
          value={phone}
          onChangeText={(v) => { setPhone(v); setError(''); }}
          placeholder="(111) 467 3783"
          keyboardType="phone-pad"
          isPhone={true}
          error={error}
        />

        <CustomButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
          disabled={!agreed}
          style={styles.button}
        />

        <View style={styles.termsContainer}>
          <TouchableOpacity 
            style={[styles.checkbox, agreed && styles.checkboxActive]} 
            onPress={() => setAgreed(!agreed)}
          />
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.link}>Terms of Use</Text> & <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.signUpContainer}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signUpText}>Don't have an account? <Text style={styles.link}>Sign Up</Text></Text>
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
  button: {
    marginTop: 15,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8587A', // Pink color from gradient
    marginRight: 10,
  },
  checkboxActive: {
    backgroundColor: '#E8587A',
  },
  termsText: {
    color: '#D1D1D1',
    fontSize: 13,
  },
  link: {
    color: '#E8587A',
    textDecorationLine: 'underline',
  },
  signUpContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  signUpText: {
    color: '#D1D1D1',
    fontSize: 14,
  },
});

export default SignInScreen;
