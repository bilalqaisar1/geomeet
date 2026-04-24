import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING } from '../../theme/theme';

const ProfileMenuItem = ({ icon, label, subtitle, onPress, isLast = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, !isLast && styles.borderBottom]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={styles.iconContainer}>
        <Icon name={icon} size={20} color={COLORS.textSecondary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>
          {label}
          {subtitle ? <Text style={styles.subtitle}> {subtitle}</Text> : null}
        </Text>
      </View>
      <Icon name="chevron-right" size={20} color={COLORS.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: SPACING.m,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.gray,
  },
});

export default ProfileMenuItem;
