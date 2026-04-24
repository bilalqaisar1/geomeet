import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING } from '../theme/theme';

const { width, height } = Dimensions.get('window');

const CapturePreviewScreen = ({ navigation, route }) => {
  const { photoUri } = route.params || {};

  const handleRetake = () => {
    // Go back to camera to retake
    navigation.replace('Camera');
  };

  const handleUsePhoto = () => {
    // Navigate back to the main tabs (Nearby) with the photo
    navigation.navigate('MainTabs', {
      screen: 'Nearby',
      params: { capturedPhoto: photoUri, timestamp: Date.now() },
    });
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Full-screen image preview */}
      <View style={styles.imageContainer}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage} />
        )}

        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Icon name="x" size={18} color={COLORS.white} />
        </TouchableOpacity>

        {/* Bottom gradient overlay with message */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.bottomOverlay}
        >
          <LinearGradient
            colors={COLORS.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.messageBanner}
          >
            <Text style={styles.messageText}>
              Photo disappears when your session ends
            </Text>
          </LinearGradient>
        </LinearGradient>
      </View>

      {/* Action buttons */}
      <View style={styles.actionsContainer}>
        {/* Retake button */}
        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
          <Text style={styles.retakeText}>Retake</Text>
        </TouchableOpacity>

        {/* Use this photo button */}
        <TouchableOpacity style={styles.usePhotoButton} onPress={handleUsePhoto}>
          <LinearGradient
            colors={COLORS.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.usePhotoGradient}
          >
            <Text style={styles.usePhotoText}>Use this photo</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  messageBanner: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    opacity: 0.85,
  },
  messageText: {
    color: COLORS.white,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    paddingBottom: 40,
    backgroundColor: '#000',
  },
  retakeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.white,
    marginRight: SPACING.m,
  },
  retakeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  usePhotoButton: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  usePhotoGradient: {
    paddingVertical: 14,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usePhotoText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CapturePreviewScreen;
