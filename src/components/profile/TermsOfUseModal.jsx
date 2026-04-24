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

const TermsOfUseModal = ({ visible, onClose }) => {
  const terms = [
    'Using the service respectfully and responsibly',
    'Not sharing inappropriate or harmful content',
    'Respecting the privacy and boundaries of other users',
    'Following community guidelines in all interactions',
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Terms of Use</Text>
          <Text style={styles.bodyText}>
            By using GeoMeet, you agree to our terms of service which include:
          </Text>
          <View style={styles.bulletList}>
            {terms.map((term, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{term}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.bodyText}>
            Complete terms: <Text style={styles.link}>terms.geomeet.app</Text>
          </Text>
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
  bulletList: { marginBottom: SPACING.m },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 4,
  },
  bullet: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 8,
    lineHeight: 20,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  link: { color: COLORS.text, fontWeight: '700' },
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

export default TermsOfUseModal;
