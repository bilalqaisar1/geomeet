import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme/theme';

const GeoMeetHeader = ({ 
  profileImage, 
  location, 
  onProfilePress, 
  onNotificationPress, 
  onLocationPress,
  showBack,
  isAuth = false
}) => {
  const navigation = useNavigation();

  // Auth/Simple Header Style - Triggered if showBack is passed (even if false) or isAuth is true
  if (showBack !== undefined || isAuth) {
    return (
      <View style={[styles.container, styles.authContainer]}>
        {showBack === true && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={30} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Main App / Home Header Style
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onProfilePress} style={styles.profileContainer}>
        <Image 
          source={{ uri: profileImage || 'https://ui-avatars.com/api/?name=User&background=random' }} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onLocationPress} style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Current Location</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationText} numberOfLines={1}>{location || 'Wynwood Art District, Miami'}</Text>
          <Icon name="chevron-down" size={16} color={COLORS.primary} style={styles.dropdownIcon} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNotificationPress} style={styles.notificationButton}>
        <View style={styles.iconBackground}>
          <Icon name="bell" size={20} color={COLORS.textSecondary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.background,
  },
  authContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    height: 60,
  },
  backButton: {
    padding: 5,
  },
  profileContainer: {
    marginRight: SPACING.s,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  dropdownIcon: {
    marginLeft: SPACING.xs,
  },
  notificationButton: {
    marginLeft: SPACING.s,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GeoMeetHeader;
