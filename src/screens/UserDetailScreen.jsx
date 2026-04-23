import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../theme/theme';
import VibeTag from '../components/VibeTag';
import CustomButton from '../components/CustomButton';

const UserDetailScreen = ({ navigation, route }) => {
  const { user } = route.params || { user: {
    name: 'Mariela',
    age: 22,
    job: 'Ui/Ux Designer',
    distance: '0.8 Miles Away',
    bio: 'I am a UI/UX Designer who designs clean, functional interfaces and meaningful user experiences.',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    vibes: ['Coffee', 'Walk', 'Drink', 'Event'],
    languages: ['English', 'Hindi']
  }};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: user.image }} style={styles.profileImage} />
          <View style={styles.overlay}>
            <Text style={styles.nameText}>{user.name}, {user.age}</Text>
            <View style={styles.overlayRow}>
              <Icon name="briefcase" size={14} color={COLORS.white} />
              <Text style={styles.overlayText}>{user.job}</Text>
            </View>
            <View style={styles.overlayRow}>
              <Icon name="map-pin" size={14} color={COLORS.white} />
              <Text style={styles.overlayText}>{user.distance}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bioText}>{user.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interested In</Text>
          <View style={styles.tagContainer}>
            {user.vibes.map((vibe, index) => (
              <VibeTag 
                key={index} 
                label={vibe} 
                icon={vibe === 'Coffee' ? 'local-cafe' : vibe === 'Walk' ? 'directions-walk' : 'local-bar'} 
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.tagContainer}>
            {user.languages.map((lang, index) => (
              <VibeTag 
                key={index} 
                label={lang} 
                icon="chat-bubble-outline"
                color={COLORS.blue}
                backgroundColor="#F0F7FF"
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.goBack()}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <CustomButton 
          title="Invite to Connect" 
          onPress={() => console.log('Connect')} 
          style={styles.connectButton}
        />
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageWrapper: {
    marginHorizontal: SPACING.m,
    height: 400,
    borderRadius: BORDER_RADIUS.l,
    overflow: 'hidden',
    position: 'relative',
    marginTop: SPACING.m,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.l,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  overlayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  overlayText: {
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 6,
  },
  section: {
    paddingHorizontal: SPACING.m,
    marginTop: SPACING.l,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  bioText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: SPACING.m,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  skipButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray,
  },
  connectButton: {
    flex: 2,
  },
});

export default UserDetailScreen;
