import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../theme/theme';
import CustomButton from '../components/CustomButton';

const FilterScreen = ({ navigation }) => {
  const [distance, setDistance] = useState(500);
  const [ageRange, setAgeRange] = useState([22, 30]);
  const [activeVibe, setActiveVibe] = useState('Just Connect');

  const vibes = [
    { label: 'Just Connect', icon: 'local-cafe' },
    { label: 'Active Hangout', icon: 'directions-walk' },
    { label: 'Grab A Bite', icon: 'restaurant' },
    { label: 'Event Buddy', icon: 'event' },
    { label: 'Explore The Area', icon: 'terrain' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Distance Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Distance</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{distance}m</Text>
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={2000}
            step={10}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor={COLORS.secondary}
            maximumTrackTintColor={COLORS.lightGray}
            thumbTintColor={COLORS.secondary}
          />
          <View style={styles.rangeLabels}>
            <Text style={styles.rangeText}>Min: 10 feet</Text>
            <Text style={styles.rangeText}>Max: 2 miles</Text>
          </View>
          
          <View style={styles.mapPreviewContainer}>
            <Image 
              source={require('../assets/map1.png')} 
              style={styles.mapPreview}
              resizeMode="cover"
            />
            <View style={styles.radiusCircle} />
          </View>
        </View>

        {/* Who Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Who</Text>
            <Text style={styles.ageLabel}>Age: <Text style={styles.ageValue}>{ageRange[0]}-{ageRange[1]}</Text></Text>
          </View>
          <View style={styles.multiSliderWrapper}>
            <MultiSlider
              values={ageRange}
              onValuesChange={setAgeRange}
              min={18}
              max={60}
              step={1}
              sliderLength={300}
              selectedStyle={{ backgroundColor: COLORS.secondary }}
              unselectedStyle={{ backgroundColor: COLORS.lightGray }}
              markerStyle={styles.sliderMarker}
              pressedMarkerStyle={styles.sliderMarkerPressed}
            />
          </View>
          <Text style={styles.rangeText}>Min: 18</Text>
        </View>

        {/* Vibe Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's the Vibe?</Text>
          <View style={styles.vibeGrid}>
            {vibes.map((vibe) => (
              <TouchableOpacity 
                key={vibe.label} 
                style={[styles.vibeCard, activeVibe === vibe.label && styles.activeVibeCard]}
                onPress={() => setActiveVibe(vibe.label)}
              >
                <MaterialIcon 
                  name={vibe.icon} 
                  size={24} 
                  color={activeVibe === vibe.label ? COLORS.white : COLORS.gray} 
                />
                <Text style={[styles.vibeLabel, activeVibe === vibe.label && styles.activeVibeLabel]}>
                  {vibe.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Note Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leave a note for people nearby</Text>
          <TextInput
            placeholder="Come try new sushi with me 🍣"
            style={styles.noteInput}
            multiline
            placeholderTextColor={COLORS.gray}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Before You Check In</Text>
          <CustomButton 
            title="Take A Quick Photo" 
            onPress={() => navigation.navigate('Camera')}
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
  section: {
    paddingHorizontal: SPACING.m,
    marginTop: SPACING.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  badge: {
    backgroundColor: '#FFE5EC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  mapPreviewContainer: {
    height: 120,
    borderRadius: 12,
    marginTop: SPACING.m,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mapPreview: {
    ...StyleSheet.absoluteFillObject,
  },
  radiusCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(230, 92, 123, 0.2)',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    alignSelf: 'center',
    top: '20%',
  },
  ageLabel: {
    fontSize: 14,
    color: COLORS.text,
  },
  ageValue: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  multiSliderWrapper: {
    alignItems: 'center',
    paddingVertical: SPACING.s,
  },
  sliderMarker: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    ...SHADOWS.light,
  },
  sliderMarkerPressed: {
    height: 28,
    width: 28,
  },
  vibeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.s,
  },
  vibeCard: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2%',
    marginBottom: 8,
    padding: 4,
  },
  activeVibeCard: {
    backgroundColor: COLORS.primary,
  },
  vibeLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '600',
  },
  activeVibeLabel: {
    color: COLORS.white,
  },
  noteInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.m,
    height: 100,
    textAlignVertical: 'top',
    marginTop: SPACING.s,
    fontSize: 14,
    color: COLORS.text,
  },
  footerContainer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: SPACING.m,
  },
  ctaButton: {
    width: '90%',
  },
});

export default FilterScreen;
