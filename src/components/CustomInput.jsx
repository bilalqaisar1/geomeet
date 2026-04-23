import React from 'react';
import { View, TextInput, StyleSheet, Text, Image } from 'react-native';

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error,
  isPhone = false,
  ...props
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, error ? styles.containerError : null]}>
        {isPhone && (
          <View style={styles.countryCodeContainer}>
            {/* Simple static flag representation. In a real app, use a picker library */}
            <Text style={styles.flagText}>🇺🇸</Text>
            <Image 
              source={require('../assets/splash.png')} // Replace with chevron down icon 
              style={styles.chevron}
            />
            <Text style={styles.codeText}>+1</Text>
          </View>
        )}
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          autoCapitalize="none"
          {...props}
        />
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // Off-white bg matching design
    borderRadius: 15,
    height: 60,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  containerError: {
    borderColor: '#FF4D4D',
    backgroundColor: '#FFF5F5',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  flagText: {
    fontSize: 20,
    marginRight: 5,
  },
  chevron: {
    width: 10,
    height: 10,
    tintColor: '#999',
    marginRight: 8,
  },
  codeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default CustomInput;
