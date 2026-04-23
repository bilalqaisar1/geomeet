import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../theme/theme';
import ChatBubble from '../components/ChatBubble';
import { DUMMY_MESSAGES } from '../services/dummyData';

const ChatDetailScreen = ({ navigation, route }) => {
  const { chat } = route.params || { chat: { name: 'Mariela', age: 22, image: 'https://randomuser.me/api/portraits/women/6.jpg' } };
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{chat.name}, {chat.age}</Text>
          <View style={styles.statusRow}>
            <Icon name="map-pin" size={12} color={COLORS.gray} />
            <Text style={styles.statusText}>0.2 mi away</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-vertical" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DUMMY_MESSAGES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble message={item} isMe={item.senderId === 'me'} />
        )}
        contentContainerStyle={styles.messageList}
        ListHeaderComponent={() => (
          <Text style={styles.dateSeparator}>Today</Text>
        )}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Message"
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              multiline
            />
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <LinearGradient
              colors={COLORS.gradient}
              style={styles.sendGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="send" size={20} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 4,
  },
  moreButton: {
    padding: 4,
  },
  messageList: {
    paddingVertical: SPACING.m,
  },
  dateSeparator: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.gray,
    marginVertical: SPACING.m,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: SPACING.m,
    marginRight: SPACING.s,
    maxHeight: 100,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 10,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  sendGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatDetailScreen;
