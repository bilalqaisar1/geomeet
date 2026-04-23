import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, BORDER_RADIUS, SPACING } from '../theme/theme';

const VibeTag = ({ label, icon, color = COLORS.success, backgroundColor = '#F0FFF4' }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {icon && <Icon name={icon} size={14} color={color} style={styles.icon} />}
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default VibeTag;
