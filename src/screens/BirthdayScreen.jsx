import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthBackground from '../components/AuthBackground';
import GeoMeetHeader from '../components/GeoMeetHeader';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const BirthdayScreen = ({ navigation }) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const handleContinue = () => {
    // Basic validation
    if (month.length === 2 && day.length === 2 && year.length === 4) {
      // Pass the birthday forward to the profile setup screen
      const birthDate = `${year}-${month}-${day}`;
      navigation.navigate('ProfileSetup', { birthDate });
    }
  };

  const isComplete = month.length > 0 && day.length > 0 && year.length === 4;

  return (
    <AuthBackground>
      <GeoMeetHeader showBack={true} />
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>When is your birthday?</Text>
        <Text style={styles.subtitle}>This cannot be changed later.</Text>

        <View style={styles.inputsRow}>
          <View style={styles.flex1}>
             <CustomInput
              value={month}
              onChangeText={(text) => setMonth(text.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="MM"
              keyboardType="number-pad"
              textAlign="center"
            />
          </View>
          <View style={styles.spacer} />
          <View style={styles.flex1}>
            <CustomInput
              value={day}
              onChangeText={(text) => setDay(text.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="DD"
              keyboardType="number-pad"
              textAlign="center"
             />
          </View>
          <View style={styles.spacer} />
          <View style={styles.flex2}>
            <CustomInput
              value={year}
              onChangeText={(text) => setYear(text.replace(/[^0-9]/g, '').slice(0, 4))}
              placeholder="YYYY"
              keyboardType="number-pad"
              textAlign="center"
             />
          </View>
        </View>

        <CustomButton
          title="Continue"
          onPress={handleContinue}
          disabled={!isComplete}
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
    marginBottom: 30,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 1.5,
  },
  spacer: {
    width: 15,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default BirthdayScreen;
