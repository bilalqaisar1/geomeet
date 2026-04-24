import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, SHADOWS } from '../../theme/theme';

const PrivacyPolicyModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          {/* Title */}
          <Text style={styles.title}>Privacy Policy</Text>

          {/* Content */}
          <Text style={styles.bodyText}>
            At GeoMeet, we take your privacy seriously. We only collect essential location data when you're actively using the app to connect with nearby users in sessions. We never share your personal information with third parties without your explicit consent.
          </Text>

          <Text style={styles.bodyText}>
            All data is encrypted in transit and at rest. You can control your privacy settings at any time from this screen.
          </Text>

          <Text style={styles.bodyText}>
            Our complete privacy policy is available at{' '}
            <Text style={styles.link}>privacy.geomeet.app</Text>
          </Text>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <LinearGradient
              colors={COLORS.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.closeGradient}
            >
              <Text style={styles.closeText}>Close</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SPACING.l,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  bodyText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.m,
  },
  link: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: SPACING.s,
    borderRadius: 24,
    overflow: 'hidden',
  },
  closeGradient: {
    paddingVertical: 14,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default PrivacyPolicyModal;
