import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme/theme';

const ChatListItem = ({ chat, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: chat.image }} style={styles.image} />
        {chat.unread && <View style={styles.unreadDot} />}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{chat.name}, {chat.age}</Text>
          <Text style={styles.time}>{chat.time}</Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.message, chat.unread && styles.unreadMessage]} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.m,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.m,
    marginHorizontal: SPACING.m,
    marginBottom: SPACING.s,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.m,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  time: {
    fontSize: 12,
    color: COLORS.gray,
  },
  footer: {
    marginTop: 4,
  },
  message: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  unreadMessage: {
    color: COLORS.text,
    fontWeight: '600',
  },
});

export default ChatListItem;
