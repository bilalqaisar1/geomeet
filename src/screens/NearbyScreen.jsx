import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme/theme';
import UserCard from '../components/UserCard';
import { DUMMY_USERS } from '../services/dummyData';
import InviteSentModal from '../components/nearby/InviteSentModal';
import ConnectedModal from '../components/nearby/ConnectedModal';
import MeetUpInviteModal from '../components/nearby/MeetUpInviteModal';

const NearbyScreen = ({ navigation, route }) => {
  // Users state — track pending/connected status per user
  const [userStates, setUserStates] = useState({});
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  // Modal states
  const [inviteSentVisible, setInviteSentVisible] = useState(false);
  const [connectedVisible, setConnectedVisible] = useState(false);
  const [meetUpVisible, setMeetUpVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Check for photo from camera flow
  useEffect(() => {
    if (route?.params?.capturedPhoto) {
      setCapturedPhoto(route.params.capturedPhoto);
    }
  }, [route?.params?.capturedPhoto, route?.params?.timestamp]);

  const filterOptions = [
    { label: 'Sort by: Distance', icon: 'chevron-down' },
    { label: 'Radius: 1mi', icon: 'chevron-down' },
    { label: 'Age: 20-30', icon: 'chevron-down' },
  ];

  // Handle invite to connect
  const handleConnect = useCallback((user) => {
    setSelectedUser(user);
    setUserStates((prev) => ({ ...prev, [user.id]: 'pending' }));
    setInviteSentVisible(true);
  }, []);

  // Handle skip
  const handleSkip = useCallback((userId) => {
    // Could implement skip logic here
    console.log('Skipped user:', userId);
  }, []);

  // Close invite sent + go back to list
  const handleInviteSentBack = useCallback(() => {
    setInviteSentVisible(false);
  }, []);

  // Cancel invite
  const handleCancelInvite = useCallback(() => {
    if (selectedUser) {
      setUserStates((prev) => {
        const next = { ...prev };
        delete next[selectedUser.id];
        return next;
      });
    }
    setInviteSentVisible(false);
  }, [selectedUser]);

  // Simulate connection (for demo — tap pending card)
  const handlePendingTap = useCallback((user) => {
    setSelectedUser(user);
    setUserStates((prev) => ({ ...prev, [user.id]: 'connected' }));
    setConnectedVisible(true);
  }, []);

  // Connected modal: back to list
  const handleConnectedBack = useCallback(() => {
    setConnectedVisible(false);
  }, []);

  // Connected modal: send message
  const handleSendMessage = useCallback(() => {
    setConnectedVisible(false);
    if (selectedUser) {
      navigation.navigate('ChatDetail', {
        chat: {
          id: selectedUser.id,
          userId: selectedUser.id,
          name: selectedUser.name,
          image: selectedUser.image,
        },
      });
    }
  }, [navigation, selectedUser]);

  // Prepare users with their current interaction states
  const usersWithState = DUMMY_USERS.map((user) => ({
    ...user,
    status: userStates[user.id] || user.status,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Nearby People</Text>
          <View style={styles.locationRow}>
            <Icon name="map-pin" size={14} color={COLORS.gray} />
            <Text style={styles.locationText}>Wynwood Art District, Miami</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => navigation.navigate('Filters')}
        >
          <Icon name="sliders" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filterOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.filterChip}>
              <Text style={styles.filterChipText}>{option.label}</Text>
              <Icon
                name={option.icon}
                size={14}
                color={COLORS.gray}
                style={styles.chipIcon}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Users list */}
      <FlatList
        data={usersWithState}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onDetail={() => navigation.navigate('UserDetail', { user: item })}
            onConnect={() => {
              if (item.status === 'pending') {
                handlePendingTap(item);
              } else if (item.status !== 'connected') {
                handleConnect(item);
              }
            }}
            onSkip={() => handleSkip(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* ===== MODALS ===== */}
      {selectedUser && (
        <>
          <InviteSentModal
            visible={inviteSentVisible}
            onClose={() => setInviteSentVisible(false)}
            onBackToList={handleInviteSentBack}
            onCancelInvite={handleCancelInvite}
            userName={selectedUser.name}
            userImage={selectedUser.image}
            myImage="https://randomuser.me/api/portraits/men/32.jpg"
          />

          <ConnectedModal
            visible={connectedVisible}
            onClose={() => setConnectedVisible(false)}
            onBackToList={handleConnectedBack}
            onSendMessage={handleSendMessage}
            user={{
              name: selectedUser.name,
              age: selectedUser.age,
              distance: selectedUser.distance,
              bio: selectedUser.bio,
              image: selectedUser.image,
            }}
          />

          <MeetUpInviteModal
            visible={meetUpVisible}
            onClose={() => setMeetUpVisible(false)}
            onBackToList={() => setMeetUpVisible(false)}
            onAccept={() => setMeetUpVisible(false)}
            user={{
              name: selectedUser.name,
              age: selectedUser.age,
              message: selectedUser.note || "Hey! I'm nearby. Ready to meet up when you are?",
              image: selectedUser.image,
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 4,
  },
  filterIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingVertical: SPACING.s,
  },
  filtersScroll: {
    paddingHorizontal: SPACING.m,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 12,
    color: COLORS.text,
  },
  chipIcon: {
    marginLeft: 4,
  },
  listContent: {
    paddingTop: SPACING.s,
    paddingBottom: SPACING.xl,
  },
});

export default NearbyScreen;
