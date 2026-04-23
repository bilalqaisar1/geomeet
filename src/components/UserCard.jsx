import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING } from '../theme/theme';
import CustomButton from './CustomButton';

const UserCard = ({ user, onConnect, onSkip, onDetail }) => {
  const isPending = user.status === 'pending';

  return (
    <TouchableOpacity onPress={onDetail} style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.name}, {user.age}</Text>
            <View style={styles.distanceBadge}>
              <Icon name="near-me" size={12} color={COLORS.secondary} />
              <Text style={styles.distanceText}>{user.distance}</Text>
            </View>
          </View>
          <Text style={styles.bio} numberOfLines={2}>{user.bio}</Text>
        </View>
      </View>

      <View style={styles.vibeRow}>
        {user.vibes.map((vibe, index) => (
          <View key={index} style={styles.vibeTag}>
            <Icon name="coffee" size={12} color={COLORS.success} />
            <Text style={styles.vibeText}>{vibe}</Text>
          </View>
        ))}
      </View>

      {user.note && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>"{user.note}"</Text>
        </View>
      )}

      <View style={styles.actionRow}>
        {isPending ? (
          <View style={styles.pendingButton}>
            <Text style={styles.pendingText}>Pending Response</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <CustomButton 
              title="Invite to Connect" 
              onPress={onConnect}
              style={styles.connectButton}
              textStyle={styles.connectButtonText}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.m,
    marginHorizontal: SPACING.m,
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  header: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.m,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  distanceText: {
    fontSize: 10,
    color: COLORS.gray,
    marginLeft: 2,
  },
  bio: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  vibeRow: {
    flexDirection: 'row',
    marginTop: SPACING.m,
  },
  vibeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FFF4', // Light green
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  vibeText: {
    fontSize: 10,
    color: COLORS.success,
    marginLeft: 4,
  },
  noteContainer: {
    backgroundColor: '#FFF8F0', // Light orange
    padding: SPACING.s,
    borderRadius: 10,
    marginTop: SPACING.m,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  noteText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: SPACING.m,
    justifyContent: 'space-between',
  },
  skipButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.s,
  },
  skipText: {
    color: COLORS.gray,
    fontWeight: '600',
  },
  connectButton: {
    flex: 2,
    height: 48,
  },
  connectButtonText: {
    fontSize: 14,
  },
  pendingButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  pendingText: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
});

export default UserCard;
