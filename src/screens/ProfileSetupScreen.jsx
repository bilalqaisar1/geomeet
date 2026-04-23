import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AuthBackground from '../components/AuthBackground';
import GeoMeetHeader from '../components/GeoMeetHeader';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { authService } from '../services/authService';

const ProfileSetupScreen = ({ route, navigation }) => {
  const { birthDate } = route.params || {};
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState(''); // Simple text for now, could be a picker
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!fullName || !agreed) return;

    setLoading(true);
    try {
      // Update Supabase user metadata with profile info
      const { error } = await authService.updateProfile({
        full_name: fullName,
        gender: gender,
        birthday: birthDate,
      });

      if (error) throw error;

      // Finish profile setup and go to onboarding
      navigation.replace('Onboarding');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <GeoMeetHeader showBack={true} />
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Set up your profile</Text>
        <Text style={styles.subtitle}>This helps people recognize you nearby.</Text>

        <CustomInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="👤  Full Name"
          autoCapitalize="words"
        />
        <Text style={styles.helperText}>Only your first name will be displayed on your public profile</Text>

        <CustomInput
          value={gender}
          onChangeText={setGender}
          placeholder="◎ Gender                                                          v"
          autoCapitalize="none"
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

        <CustomButton
          title="Continue"
          onPress={handleContinue}
          loading={loading}
          disabled={!fullName || !agreed}
          style={styles.button}
        />
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D1D1',
    marginBottom: 25,
    textAlign: 'center',
  },
  helperText: {
      color: '#A0A0A0',
      fontSize: 11,
      alignSelf: 'flex-start',
      marginLeft: 5,
      marginTop: -10,
      marginBottom: 15,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8587A', 
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
  button: {
    marginBottom: 20,
  },
});

export default ProfileSetupScreen;
