import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../theme/theme';

const AvatarStack = ({ avatars, extraCount }) => {
  return (
    <View style={styles.container}>
      {avatars.map((avatar, index) => (
        <View key={index} style={[styles.avatarContainer, { marginLeft: index === 0 ? 0 : -15, zIndex: 10 - index }]}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
      ))}
      {extraCount > 0 && (
        <View style={[styles.extraContainer, { marginLeft: -15, zIndex: 0 }]}>
          <Text style={styles.extraText}>+{extraCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.light,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  extraContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.light,
  },
  extraText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AvatarStack;
