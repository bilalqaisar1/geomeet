import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SHADOWS } from '../../theme/theme';

const SessionPreferencesModal = ({ visible, onClose, onSave }) => {
  const [radius, setRadius] = useState(500);
  const [receiveNotifications, setReceiveNotifications] = useState(false);

  const formatRadius = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}km`;
    }
    return `${Math.round(value)}m`;
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ radius, receiveNotifications });
    }
    onClose();
  };

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
          <Text style={styles.title}>Session Preferences</Text>
          <Text style={styles.subtitle}>
            Customize how far you want to connect with others in GeoMeet sessions.
          </Text>

          {/* Discovery Radius */}
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>Discovery Radius</Text>
            <Text style={styles.sliderValue}>{formatRadius(radius)}</Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={100}
            maximumValue={1000}
            step={50}
            value={radius}
            onValueChange={setRadius}
            minimumTrackTintColor={COLORS.primary}
            maximumTrackTintColor={COLORS.border}
            thumbTintColor={COLORS.primary}
          />

          <View style={styles.sliderLabels}>
            <Text style={styles.rangeLabel}>100m</Text>
            <Text style={styles.rangeLabel}>1km</Text>
          </View>

          {/* Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setReceiveNotifications(!receiveNotifications)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, receiveNotifications && styles.checkboxChecked]}>
              {receiveNotifications && (
                <Icon name="check" size={14} color={COLORS.white} />
              )}
            </View>
            <Text style={styles.checkboxLabel}>Receive session notifications</Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <LinearGradient
                colors={COLORS.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveGradient}
              >
                <Text style={styles.saveText}>Save Preferences</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    marginBottom: SPACING.s,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 19,
    marginBottom: SPACING.l,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  sliderLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  sliderValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.l,
  },
  rangeLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.text,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  saveButton: {
    flex: 1.3,
    borderRadius: 24,
    overflow: 'hidden',
  },
  saveGradient: {
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SessionPreferencesModal;
