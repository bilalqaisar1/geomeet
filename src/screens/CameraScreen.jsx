import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera } from 'react-native-image-picker';
import { COLORS } from '../theme/theme';

const CameraScreen = ({ navigation }) => {
  // Launch camera immediately on mount
  useEffect(() => {
    openCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      cameraType: 'front',
      quality: 0.9,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        // User cancelled — go back
        navigation.goBack();
      } else if (response.errorCode) {
        Alert.alert('Camera Error', response.errorMessage || 'Could not open camera');
        navigation.goBack();
      } else if (response.assets && response.assets[0]) {
        const photoUri = response.assets[0].uri;
        // Navigate to preview with the captured photo
        navigation.replace('CapturePreview', { photoUri });
      } else {
        navigation.goBack();
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Dark background while camera is loading */}
      <View style={styles.cameraPlaceholder}>
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="x" size={20} color={COLORS.white} />
        </TouchableOpacity>

        {/* Flash button */}
        <TouchableOpacity style={styles.flashButton}>
          <Icon name="zap" size={20} color={COLORS.white} />
        </TouchableOpacity>

        {/* Bottom message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            This helps people spot you fast. No awkward 'is that you?' moments.
          </Text>
        </View>

        {/* Bottom controls */}
        <View style={styles.controls}>
          <View style={styles.controlSpacer} />

          {/* Capture button */}
          <TouchableOpacity style={styles.captureButton} onPress={openCamera}>
            <View style={styles.captureInner} />
          </TouchableOpacity>

          {/* Flip camera */}
          <TouchableOpacity style={styles.flipButton}>
            <Icon name="refresh-cw" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  flashButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  messageContainer: {
    position: 'absolute',
    bottom: 130,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  messageText: {
    color: COLORS.white,
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 18,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    paddingHorizontal: 40,
  },
  controlSpacer: {
    flex: 1,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.white,
  },
  flipButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CameraScreen;
