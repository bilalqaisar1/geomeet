import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SHADOWS } from '../../theme/theme';

const ProfileHeader = ({
  name = 'Sarah Warren',
  username = '',
  avatarUri = 'https://randomuser.me/api/portraits/women/44.jpg',
  onEditProfile,
  onCameraPress,
  showEditButton = true,
}) => {
  return (
    <View style={styles.container}>
      {/* Avatar with camera icon */}
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <TouchableOpacity style={styles.cameraIcon} onPress={onCameraPress}>
          <Icon name="camera" size={14} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={styles.name}>{name}</Text>

      {/* Optional username / email */}
      {username ? <Text style={styles.username}>{username}</Text> : null}

      {/* Edit Profile Button */}
      {showEditButton && (
        <TouchableOpacity onPress={onEditProfile} style={styles.editButton}>
          <LinearGradient
            colors={COLORS.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.editGradient}
          >
            <Text style={styles.editText}>Edit Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: SPACING.l,
    paddingBottom: SPACING.m,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: SPACING.m,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: COLORS.white,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  username: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: SPACING.s,
  },
  editButton: {
    marginTop: SPACING.m,
    borderRadius: 24,
    overflow: 'hidden',
  },
  editGradient: {
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProfileHeader;
