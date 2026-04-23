import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../theme/theme';
import CustomButton from '../components/CustomButton';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [user, setUser] = useState({
    name: 'Tom Holland',
    age: 27,
    bio: 'Actor, lover of golf and taking photos. Just here to meet some cool people nearby!',
    job: 'Actor'
  });

  const handleCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Could not open camera');
      } else {
        const source = response.assets[0].uri;
        setProfileImage(source);
      }
    });
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'This feature is coming soon!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={handleEditProfile}>
          <Icon name="edit-3" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileInfo}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: profileImage }} style={styles.image} />
            <TouchableOpacity style={styles.cameraIcon} onPress={handleCamera}>
              <Icon name="camera" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          <Text style={styles.job}>{user.job}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Nearby</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>{user.bio}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Icon name="bell" size={20} color={COLORS.gray} />
            <Text style={styles.settingLabel}>Notifications</Text>
            <Icon name="chevron-right" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Icon name="shield" size={20} color={COLORS.gray} />
            <Text style={styles.settingLabel}>Privacy & Security</Text>
            <Icon name="chevron-right" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Icon name="help-circle" size={20} color={COLORS.gray} />
            <Text style={styles.settingLabel}>Help Center</Text>
            <Icon name="chevron-right" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: SPACING.m,
  },
  imageContainer: {
    position: 'relative',
    ...SHADOWS.medium,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.m,
  },
  job: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.m,
    marginTop: SPACING.l,
    borderRadius: 15,
    paddingVertical: SPACING.m,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  section: {
    paddingHorizontal: SPACING.m,
    marginTop: SPACING.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  bioContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.m,
    borderRadius: 12,
  },
  bioText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLabel: {
    flex: 1,
    marginLeft: SPACING.m,
    fontSize: 16,
    color: COLORS.text,
  },
  logoutButton: {
    marginTop: SPACING.xl,
    paddingVertical: SPACING.m,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
