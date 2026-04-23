import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  Switch,
  TouchableOpacity 
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../theme/theme';
import GeoMeetHeader from '../components/GeoMeetHeader';
import MapCard from '../components/MapCard';
import AvatarStack from '../components/AvatarStack';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({ navigation }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const toggleCheckIn = () => setIsCheckedIn(previousState => !previousState);

  const nearbyAvatars = [
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
  ];

  const initialRegion = {
    latitude: 25.7997,
    longitude: -80.1986,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const markers = [
    { coordinate: { latitude: 25.8000, longitude: -80.1990 }, type: 'food' },
    { coordinate: { latitude: 25.7990, longitude: -80.1980 }, type: 'bar' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <GeoMeetHeader 
        onProfilePress={() => navigation.navigate('Profile')}
      />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Check-In Toggle */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Check in / End Session</Text>
          <Switch
            trackColor={{ false: COLORS.lightGray, true: '#FFBFA9' }}
            thumbColor={isCheckedIn ? COLORS.primary : COLORS.gray}
            onValueChange={toggleCheckIn}
            value={isCheckedIn}
          />
        </View>

        {/* Map Card */}
        <MapCard region={initialRegion} markers={markers} />

        {/* Nearby Info */}
        <View style={styles.nearbySection}>
          <AvatarStack avatars={nearbyAvatars} extraCount={12} />
          
          <Text style={styles.title}>Who's nearby? Check in to find out.</Text>
          <Text style={styles.subtitle}>Sometimes a little company is all it takes.</Text>

          <CustomButton 
            title="Start Check-In" 
            onPress={() => navigation.navigate('Filters')}
            style={styles.ctaButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SPACING.m,
    marginVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.m,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  nearbySection: {
    alignItems: 'center',
    marginTop: SPACING.l,
    paddingHorizontal: SPACING.xl,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: SPACING.m,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.s,
  },
  ctaButton: {
    marginTop: SPACING.l,
    width: '100%',
  },
});

export default HomeScreen;
