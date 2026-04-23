import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

const OTP_LENGTH = 6;

const OtpInput = ({ value, onChangeText }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Derive an array of length 6 showing the entered digits or empty strings
  const digits = value.split('').slice(0, OTP_LENGTH);
  const displayArray = Array(OTP_LENGTH).fill('').map((_, i) => digits[i] || '');

  const handlePress = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  return (
    <View style={styles.container}>
      {/* 
        This pressable overlays the hidden input but looks like 6 distinct boxes.
        When pressed, it focuses the invisible TextInput.
      */}
      <Pressable style={styles.boxesContainer} onPress={handlePress}>
        {displayArray.map((digit, index) => {
          // Highlight the currently active box
          const isActive = isFocused && value.length === index;
          // Also highlight if it's the last box and the input is full
          const isFullActive = isFocused && value.length === OTP_LENGTH && index === OTP_LENGTH - 1;
          
          return (
            <View 
              key={index} 
              style={[
                styles.box, 
                (isActive || isFullActive) && styles.boxActive,
                digit !== '' && styles.boxFilled
              ]}
            >
              <Text style={styles.digitText}>{digit}</Text>
            </View>
          );
        })}
      </Pressable>

      {/* Hidden input to capture keyboard events properly on mobile */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => {
          // Only allow numbers and max length
          const cleaned = text.replace(/[^0-9]/g, '');
          if (cleaned.length <= OTP_LENGTH) {
            onChangeText(cleaned);
          }
        }}
        keyboardType="number-pad"
        textContentType="oneTimeCode" // iOS autofill
        style={styles.hiddenInput}
        caretHidden
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    width: 50,
    height: 60,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  boxActive: {
    borderColor: '#E8587A', // border color when typing indicating focus
  },
  boxFilled: {
    backgroundColor: '#FFFFFF', // slightly brighter when filled
    elevation: 2, // shadow for android
    shadowColor: '#000', // shadow for ios
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  digitText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
});

export default OtpInput;
