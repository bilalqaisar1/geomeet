import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, SHADOWS } from '../../theme/theme';

const NOTIFICATION_ITEMS = [
  {
    key: 'newMessages',
    title: 'New Messages',
    description: 'Get notified when someone messages you.',
  },
  {
    key: 'connectionRequests',
    title: 'Connection Requests',
    description: 'Get notified when someone wants to connect.',
  },
  {
    key: 'meetupInvites',
    title: 'Meet-up Invites',
    description: 'Get notified when someone invites you to meet.',
  },
  {
    key: 'checkinUpdates',
    title: 'Check-in Updates',
    description: 'Get notified when your check-in starts or ends.',
  },
];

const NotificationModal = ({ visible, onClose, onUpdate }) => {
  const [notifications, setNotifications] = useState({
    newMessages: true,
    connectionRequests: true,
    meetupInvites: true,
    checkinUpdates: true,
  });

  const toggleSwitch = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(notifications);
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Notification</Text>
          <Text style={styles.subtitle}>
            Choose which notifications you want to receive.
          </Text>

          {NOTIFICATION_ITEMS.map((item, index) => (
            <View
              key={item.key}
              style={[
                styles.notifRow,
                index < NOTIFICATION_ITEMS.length - 1 && styles.notifBorder,
              ]}
            >
              <View style={styles.notifTextContainer}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text style={styles.notifDesc}>{item.description}</Text>
              </View>
              <Switch
                value={notifications[item.key]}
                onValueChange={() => toggleSwitch(item.key)}
                trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                thumbColor={COLORS.white}
                ios_backgroundColor={COLORS.lightGray}
              />
            </View>
          ))}

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
              <LinearGradient
                colors={COLORS.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.updateGradient}
              >
                <Text style={styles.updateText}>Update</Text>
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
    marginBottom: SPACING.m,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  notifBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  notifTextContainer: {
    flex: 1,
    marginRight: SPACING.s,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  notifDesc: {
    fontSize: 12,
    color: COLORS.gray,
    lineHeight: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.m,
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
  updateButton: {
    flex: 1.3,
    borderRadius: 24,
    overflow: 'hidden',
  },
  updateGradient: {
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default NotificationModal;
