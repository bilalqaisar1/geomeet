import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../theme/theme';
import ChatListItem from '../components/ChatListItem';
import { DUMMY_CHATS } from '../services/dummyData';

const ChatsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Unread');
  const tabs = ['Unread', 'Recent', 'Nearby'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={COLORS.gray} />
          <TextInput 
            placeholder="Search" 
            style={styles.searchInput}
            placeholderTextColor={COLORS.gray}
          />
        </View>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={DUMMY_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem 
            chat={item} 
            onPress={() => navigation.navigate('ChatDetail', { chat: item })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={() => (
          <Text style={styles.footerNote}>Chats disappear after 48 hours</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  searchContainer: {
    paddingHorizontal: SPACING.m,
    marginBottom: SPACING.m,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.m,
    height: 48,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.s,
    fontSize: 16,
    color: COLORS.text,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.m,
    padding: 4,
    borderRadius: 12,
    marginBottom: SPACING.m,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.text,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  footerNote: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 12,
    marginTop: SPACING.xl,
    marginBottom: SPACING.l,
  },
});

export default ChatsScreen;
