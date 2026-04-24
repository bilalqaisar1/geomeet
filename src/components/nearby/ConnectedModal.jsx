import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, SHADOWS } from '../../theme/theme';

const ConnectedModal = ({
  visible,
  onClose,
  onBackToList,
  onSendMessage,
  user = {
    name: 'Sarah',
    age: 26,
    distance: '0.2 mi away',
    bio: 'Coffee enthusiast & hiker',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
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

          {/* Green checkmark */}
          <View style={styles.checkContainer}>
            <View style={styles.checkCircle}>
              <Icon name="check" size={32} color={COLORS.white} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>You're connected!</Text>
          <Text style={styles.subtitle}>
            Start a conversation with {user.name} now to get to know each other.
          </Text>

          {/* User info card */}
          <View style={styles.userCard}>
            <Image source={{ uri: user.image }} style={styles.userAvatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}, {user.age}</Text>
              <Text style={styles.userBio}>{user.bio}</Text>
            </View>
            <View style={styles.distanceBadge}>
              <MaterialIcon name="near-me" size={12} color={COLORS.secondary} />
              <Text style={styles.distanceText}>{user.distance}</Text>
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
              style={styles.messageButton}
              onPress={onSendMessage || onClose}
            >
              <LinearGradient
                colors={COLORS.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.messageGradient}
              >
                <Text style={styles.messageText}>Send A Message</Text>
              </LinearGradient>
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
    minHeight: 450,
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
  checkContainer: {
    marginTop: SPACING.l,
    marginBottom: SPACING.m,
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.success,
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.m,
    marginBottom: SPACING.xl,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    flex: 1,
    marginLeft: SPACING.m,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  userBio: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 11,
    color: COLORS.secondary,
    marginLeft: 2,
    fontWeight: '500',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
  messageButton: {
    flex: 1.2,
    borderRadius: 28,
    overflow: 'hidden',
  },
  messageGradient: {
    paddingVertical: 14,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ConnectedModal;
