import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, SHADOWS } from '../../theme/theme';

const InviteSentModal = ({
  visible,
  onClose,
  onBackToList,
  onCancelInvite,
  userName = 'Sarah',
  userImage = 'https://randomuser.me/api/portraits/women/1.jpg',
  myImage = 'https://randomuser.me/api/portraits/men/32.jpg',
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Drag handle */}
          <View style={styles.dragHandle} />

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="x" size={20} color={COLORS.text} />
          </TouchableOpacity>

          {/* Play icon */}
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={COLORS.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.playIconGradient}
            >
              <MaterialIcon name="send" size={28} color={COLORS.white} />
            </LinearGradient>
          </View>

          {/* Title */}
          <Text style={styles.title}>Invite Sent!</Text>
          <Text style={styles.subtitle}>
            Your invitation is on its way to {userName}. We'll let you know when they respond.
          </Text>

          {/* Avatar pair with arrow */}
          <View style={styles.avatarRow}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: myImage }} style={styles.avatar} />
              <View style={styles.statusDotGreen} />
            </View>

            {/* Dashed line + arrow */}
            <View style={styles.arrowContainer}>
              <Text style={styles.dashes}>- - -</Text>
              <View style={styles.arrowCircle}>
                <MaterialIcon name="arrow-forward" size={16} color={COLORS.white} />
              </View>
              <Text style={styles.dashes}>- - -</Text>
            </View>

            <View style={styles.avatarContainer}>
              <Image source={{ uri: userImage }} style={styles.avatar} />
              <View style={styles.statusDotPurple} />
            </View>
          </View>

          {/* Pending Response */}
          <View style={styles.pendingRow}>
            <View style={styles.pendingDot} />
            <Text style={styles.pendingText}>Pending Response</Text>
          </View>

          {/* Action buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackToList || onClose}
            >
              <LinearGradient
                colors={COLORS.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.backGradient}
              >
                <Text style={styles.backText}>Back to Nearby List</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelInviteButton}
              onPress={onCancelInvite || onClose}
            >
              <Text style={styles.cancelInviteText}>Cancel Invite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    paddingBottom: 40,
    alignItems: 'center',
    minHeight: 480,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.m,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: SPACING.l,
    marginBottom: SPACING.m,
  },
  playIconGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: SPACING.m,
    marginBottom: SPACING.l,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.light,
  },
  statusDotGreen: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  statusDotPurple: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  dashes: {
    fontSize: 12,
    color: COLORS.gray,
    letterSpacing: 2,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  pendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  pendingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },
  pendingText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  backButton: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: SPACING.m,
  },
  backGradient: {
    paddingVertical: 16,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  cancelInviteButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: '100%',
    alignItems: 'center',
  },
  cancelInviteText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
});

export default InviteSentModal;
