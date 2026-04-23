import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import CustomButton from '../components/CustomButton';

const { width } = Dimensions.get('window');

// ==================== STEP DATA ====================
const STEP_1_OPTIONS = [
  'Warm and chatty',
  'Calm and observant',
  'Straightforward and to the point',
  'Depends on the vibe',
];

const STEP_2_OPTIONS = [
  'Love them',
  'Okay with notice',
  'Prefer planning ahead',
  'Depends on the day',
];

const LANGUAGE_OPTIONS = ['English', 'Urdu', 'Spanish', 'French', 'Arabic', 'Hindi'];

// ==================== PROGRESS BAR ====================
const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.progressContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressSegment,
            index <= currentStep ? styles.progressActive : styles.progressInactive,
            index < totalSteps - 1 && { marginRight: 8 },
          ]}
        />
      ))}
    </View>
  );
};

// ==================== RADIO OPTION ====================
const RadioOption = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.radioContainer, selected && styles.radioSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.radioLabel, selected && styles.radioLabelSelected]}>
        {label}
      </Text>
      <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
        {selected && <View style={styles.radioCircleInner} />}
      </View>
    </TouchableOpacity>
  );
};

// ==================== STEP 1: Meeting Style ====================
const Step1 = ({ selectedOption, onSelect }) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.questionText}>
        How do you usually come across when meeting someone new?
      </Text>
      <View style={styles.optionsContainer}>
        {STEP_1_OPTIONS.map((option) => (
          <RadioOption
            key={option}
            label={option}
            selected={selectedOption === option}
            onPress={() => onSelect(option)}
          />
        ))}
      </View>
    </View>
  );
};

// ==================== STEP 2: Plans Style ====================
const Step2 = ({ selectedOption, onSelect }) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.questionText}>
        How do you feel about last-minute plans?
      </Text>
      <View style={styles.optionsContainer}>
        {STEP_2_OPTIONS.map((option) => (
          <RadioOption
            key={option}
            label={option}
            selected={selectedOption === option}
            onPress={() => onSelect(option)}
          />
        ))}
      </View>
    </View>
  );
};

// ==================== STEP 3: Personality ====================
const Step3 = ({ bio, onBioChange, language, onLanguageChange, occupation, onOccupationChange }) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.questionText}>Showcase your personality</Text>
      <Text style={styles.questionSubtext}>
        How would you describe yourself in one sentence? keep it respectful
      </Text>

      {/* Bio text area */}
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          value={bio}
          onChangeText={(text) => {
            if (text.length <= 200) onBioChange(text);
          }}
          placeholder="Easygoing, enjoys good conversations and spontaneous plans."
          placeholderTextColor="#B0B0B0"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{bio.length}/200</Text>
      </View>

      {/* Language */}
      <Text style={styles.fieldLabel}>Language</Text>
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={() => setShowLangDropdown(!showLangDropdown)}
        activeOpacity={0.7}
      >
        <Text style={[styles.dropdownText, !language && { color: '#B0B0B0' }]}>
          {language || 'Select language'}
        </Text>
        <Text style={styles.dropdownChevron}>▾</Text>
      </TouchableOpacity>

      {showLangDropdown && (
        <View style={styles.dropdownMenu}>
          {LANGUAGE_OPTIONS.map((lang) => (
            <TouchableOpacity
              key={lang}
              style={styles.dropdownItem}
              onPress={() => {
                onLanguageChange(lang);
                setShowLangDropdown(false);
              }}
            >
              <Text style={[styles.dropdownItemText, language === lang && { color: '#E8587A', fontWeight: '600' }]}>
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Occupation */}
      <Text style={styles.fieldLabel}>What do you do for a living?</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInputField}
          value={occupation}
          onChangeText={onOccupationChange}
          placeholder="UI/Ux Designer"
          placeholderTextColor="#B0B0B0"
        />
      </View>
    </View>
  );
};

// ==================== MAIN ONBOARDING SCREEN ====================
const OnboardingScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1 state
  const [step1Answer, setStep1Answer] = useState('');

  // Step 2 state
  const [step2Answer, setStep2Answer] = useState('');

  // Step 3 state
  const [bio, setBio] = useState('');
  const [language, setLanguage] = useState('English');
  const [occupation, setOccupation] = useState('');

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step — go to Home
      navigation.replace('MainTabs');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1 selectedOption={step1Answer} onSelect={setStep1Answer} />;
      case 1:
        return <Step2 selectedOption={step2Answer} onSelect={setStep2Answer} />;
      case 2:
        return (
          <Step3
            bio={bio}
            onBioChange={setBio}
            language={language}
            onLanguageChange={setLanguage}
            occupation={occupation}
            onOccupationChange={setOccupation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {/* Divider line */}
        <View style={styles.divider} />

        {/* Current Step Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderStep()}
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            disabled={currentStep === 0}
            activeOpacity={0.7}
          >
            <Text style={[styles.backButtonText, currentStep === 0 && styles.backButtonDisabled]}>
              Back
            </Text>
          </TouchableOpacity>

          <View style={styles.nextButtonWrapper}>
            <CustomButton
              title="Next"
              onPress={handleNext}
              style={styles.nextButton}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// ==================== STYLES ====================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 15,
  },

  // ---- Progress Bar ----
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  progressSegment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
  },
  progressActive: {
    backgroundColor: '#F5A623', // Orange from design
  },
  progressInactive: {
    backgroundColor: '#E8E8E8',
  },

  // ---- Divider ----
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
  },

  // ---- Scroll ----
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },

  // ---- Step Container ----
  stepContainer: {
    flex: 1,
    paddingTop: 10,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 30,
  },
  questionSubtext: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    lineHeight: 20,
  },

  // ---- Radio Options ----
  optionsContainer: {
    marginTop: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  radioSelected: {
    borderColor: '#E8587A',
    backgroundColor: '#FFF9F5',
  },
  radioLabel: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  radioLabelSelected: {
    color: '#1A1A1A',
    fontWeight: '500',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8587A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  radioCircleSelected: {
    borderColor: '#E8587A',
  },
  radioCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E8587A',
  },

  // ---- Text Area (Step 3) ----
  textAreaContainer: {
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 5,
    minHeight: 130,
  },
  textArea: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    padding: 0,
    lineHeight: 22,
  },
  charCount: {
    fontSize: 12,
    color: '#B0B0B0',
    textAlign: 'right',
    marginTop: 8,
  },

  // ---- Field Label ----
  fieldLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
  },

  // ---- Dropdown ----
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  dropdownChevron: {
    fontSize: 18,
    color: '#999',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#333',
  },

  // ---- Text Input (Occupation) ----
  textInputContainer: {
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  textInputField: {
    fontSize: 15,
    color: '#333',
    padding: 0,
  },

  // ---- Bottom Buttons ----
  bottomButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  backButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 15,
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  backButtonDisabled: {
    color: '#CCC',
  },
  nextButtonWrapper: {
    flex: 1.5,
  },
  nextButton: {
    marginVertical: 0,
  },
});

export default OnboardingScreen;
