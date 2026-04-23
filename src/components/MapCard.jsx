import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING } from '../theme/theme';

const MapCard = ({ region, markers }) => {
  return (
    <View style={styles.container}>
      {/* Static Map Image instead of Real Map */}
      <Image 
        source={require('../assets/map1.png')} 
        style={styles.mapImage}
        resizeMode="cover"
      />

      {/* Floating UI Elements on top of the image */}
      <View style={styles.markersOverlay}>
        {/* We can simulate a few markers on top of the image for visual effect */}
        <View style={[styles.customMarker, { top: '30%', left: '40%' }]}>
           <Icon name="restaurant" size={15} color={COLORS.white} />
        </View>
        <View style={[styles.customMarker, { top: '50%', left: '60%', backgroundColor: COLORS.secondary }]}>
           <Icon name="local-bar" size={15} color={COLORS.white} />
        </View>
      </View>

      <View style={styles.centerButtonContainer}>
        <TouchableOpacity style={styles.centerButton}>
          <Icon name="navigation" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomLeftLabel}>
        <View style={styles.dot} />
        <Text style={styles.labelText}>32 Spotted Nearby</Text>
      </View>

      <TouchableOpacity style={styles.gpsButton}>
        <Icon name="my-location" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    marginHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.l,
    overflow: 'hidden',
    ...SHADOWS.medium,
    backgroundColor: COLORS.surface,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  markersOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  customMarker: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.light,
  },
  centerButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.medium,
  },
  bottomLeftLabel: {
    position: 'absolute',
    bottom: SPACING.m,
    left: SPACING.m,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.s,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  gpsButton: {
    position: 'absolute',
    bottom: SPACING.m,
    right: SPACING.m,
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
});

export default MapCard;
