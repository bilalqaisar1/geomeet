import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { COLORS, SPACING } from '../theme/theme';

// Profile components
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileMenuItem from '../components/profile/ProfileMenuItem';
import EditProfileModal from '../components/profile/EditProfileModal';
import SessionPreferencesModal from '../components/profile/SessionPreferencesModal';
import PrivacyPolicyModal from '../components/profile/PrivacyPolicyModal';
import TermsOfUseModal from '../components/profile/TermsOfUseModal';
import SupportContactModal from '../components/profile/SupportContactModal';
import NotificationModal from '../components/profile/NotificationModal';
import LogoutModal from '../components/profile/LogoutModal';
import DeleteAccountModal from '../components/profile/DeleteAccountModal';

const ProfileScreen = ({ navigation }) => {
  // User state
  const [userName, setUserName] = useState('Sarah Warren');
  const [avatarUri, setAvatarUri] = useState(
    'https://randomuser.me/api/portraits/women/44.jpg',
  );

  // Modal visibility states
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [sessionPrefsVisible, setSessionPrefsVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [supportVisible, setSupportVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  // Camera handler
  const handleCameraPress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', 'Could not open camera');
        return;
      }
      if (response.assets && response.assets[0]) {
        setAvatarUri(response.assets[0].uri);
      }
    });
  };

  // Edit profile save handler
  const handleSaveName = (newName) => {
    if (newName.trim()) {
      setUserName(newName.trim());
    }
  };

  // Logout handler
  const handleLogout = () => {
    setLogoutVisible(false);
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    }
  };

  // Delete account handler
  const handleDeleteAccount = () => {
    setDeleteVisible(false);
    Alert.alert(
      'Account Deleted',
      'Your account has been permanently deleted.',
      [
        {
          text: 'OK',
          onPress: () => {
            if (navigation) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              });
            }
          },
        },
      ],
    );
  };

  // Location handler
  const handleLocation = () => {
    Alert.alert('Location', 'Location settings will be available soon.');
  };

  // Menu items configuration
  const menuItems = [
    {
      icon: 'sliders',
      label: 'Update session preferences',
      subtitle: '(optional)',
      onPress: () => setSessionPrefsVisible(true),
    },
    {
      icon: 'shield',
      label: 'Privacy Policy',
      onPress: () => setPrivacyVisible(true),
    },
    {
      icon: 'file-text',
      label: 'Terms of Use',
      onPress: () => setTermsVisible(true),
    },
    {
      icon: 'map-pin',
      label: 'Location',
      onPress: handleLocation,
    },
    {
      icon: 'bell',
      label: 'Notification',
      onPress: () => setNotifVisible(true),
    },
    {
      icon: 'headphones',
      label: 'Support / Contact',
      onPress: () => setSupportVisible(true),
    },
    {
      icon: 'log-out',
      label: 'Log Out',
      onPress: () => setLogoutVisible(true),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header with back arrow */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation && navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Profile Header: Avatar + Name + Edit Profile button */}
        <ProfileHeader
          name={userName}
          username=""
          avatarUri={avatarUri}
          onEditProfile={() => setEditProfileVisible(true)}
          onCameraPress={handleCameraPress}
          showEditButton={true}
        />

        {/* Menu Items List */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <ProfileMenuItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              subtitle={item.subtitle}
              onPress={item.onPress}
              isLast={index === menuItems.length - 1}
            />
          ))}
        </View>

        {/* Delete Account Link */}
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={() => setDeleteVisible(true)}
        >
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ===== MODALS ===== */}
      <EditProfileModal
        visible={editProfileVisible}
        onClose={() => setEditProfileVisible(false)}
        onSave={handleSaveName}
        currentName={userName}
      />
      <SessionPreferencesModal
        visible={sessionPrefsVisible}
        onClose={() => setSessionPrefsVisible(false)}
        onSave={(prefs) => console.log('Session prefs:', prefs)}
      />
      <PrivacyPolicyModal
        visible={privacyVisible}
        onClose={() => setPrivacyVisible(false)}
      />
      <TermsOfUseModal
        visible={termsVisible}
        onClose={() => setTermsVisible(false)}
      />
      <SupportContactModal
        visible={supportVisible}
        onClose={() => setSupportVisible(false)}
      />
      <NotificationModal
        visible={notifVisible}
        onClose={() => setNotifVisible(false)}
        onUpdate={(settings) => console.log('Notification settings:', settings)}
      />
      <LogoutModal
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        onLogout={handleLogout}
      />
      <DeleteAccountModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        onDelete={handleDeleteAccount}
      />
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
    paddingVertical: SPACING.m,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  menuContainer: {
    marginTop: SPACING.m,
    marginHorizontal: SPACING.s,
  },
  deleteAccountButton: {
    alignItems: 'center',
    paddingVertical: SPACING.l,
    marginTop: SPACING.s,
  },
  deleteAccountText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.secondary,
  },
});

export default ProfileScreen;
