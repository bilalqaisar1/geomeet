import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, SHADOWS } from '../../theme/theme';

const MeetUpInviteModal = ({
  visible,
  onClose,
  onBackToList,
  onAccept,
  user = {
    name: 'Sarah',
    age: 26,
    message: "Hey! I'm nearby at Starbucks. Ready to meet up when you are?",
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
}) => {
  return (
    <Modal visible={visible} transparent={false} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="x" size={22} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meet-Up Invite</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* User Avatar */}
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.image }} style={styles.avatar} />
          </View>

          {/* Name */}
          <Text style={styles.userName}>{user.name}, {user.age}</Text>

          {/* Message */}
          <Text style={styles.messageText}>"{user.message}"</Text>

          {/* Map cards */}
          <View style={styles.mapCardsRow}>
            <TouchableOpacity style={styles.mapCard}>
              <View style={[styles.mapIcon, { backgroundColor: '#FFF0F5' }]}>
                <MaterialIcon name="map" size={24} color={COLORS.secondary} />
              </View>
              <Text style={styles.mapCardTitle}>Meeting with {user.name}?</Text>
              <Text style={styles.mapCardSub}>Open in Maps</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mapCard}>
              <View style={[styles.mapIcon, { backgroundColor: '#FFF0F0' }]}>
                <MaterialIcon name="location-on" size={24} color={COLORS.error} />
              </View>
              <Text style={styles.mapCardTitle}>Meeting with {user.name}?</Text>
              <Text style={styles.mapCardSub}>Open in Google Maps</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.backListButton}
            onPress={onBackToList || onClose}
          >
            <Text style={styles.backListText}>Back To Nearby List</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptButton}
            onPress={onAccept || onClose}
          >
            <LinearGradient
              colors={COLORS.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.acceptGradient}
            >
              <Text style={styles.acceptText}>Accept</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.l,
  },
  avatarContainer: {
    marginBottom: SPACING.m,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  messageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: SPACING.m,
    marginBottom: SPACING.xl,
    fontStyle: 'italic',
  },
  mapCardsRow: {
    flexDirection: 'row',
    width: '100%',
  },
  mapCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.m,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mapIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  mapCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  mapCardSub: {
    fontSize: 11,
    color: COLORS.gray,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    paddingBottom: 30,
  },
  backListButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginRight: SPACING.s,
  },
  backListText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
  },
  acceptButton: {
    flex: 1.2,
    borderRadius: 28,
    overflow: 'hidden',
  },
  acceptGradient: {
    paddingVertical: 14,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default MeetUpInviteModal;
