import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme/theme';

const ChatBubble = ({ message, isMe }) => {
  return (
    <View style={[styles.container, isMe ? styles.myContainer : styles.theirContainer]}>
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
        <Text style={[styles.text, isMe ? styles.myText : styles.theirText]}>{message.text}</Text>
        <Text style={[styles.time, isMe ? styles.myTime : styles.theirTime]}>{message.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: SPACING.m,
  },
  myContainer: {
    alignItems: 'flex-end',
  },
  theirContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },
  myBubble: {
    backgroundColor: COLORS.surface,
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  myText: {
    color: COLORS.text,
  },
  theirText: {
    color: COLORS.text,
  },
  time: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myTime: {
    color: COLORS.gray,
  },
  theirTime: {
    color: COLORS.gray,
  },
});

export default ChatBubble;
