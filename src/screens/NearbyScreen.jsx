import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  FlatList 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme/theme';
import UserCard from '../components/UserCard';
import { DUMMY_USERS } from '../services/dummyData';

const NearbyScreen = ({ navigation }) => {
  const filterOptions = [
    { label: 'Sort by: Distance', icon: 'chevron-down' },
    { label: 'Radius: 1mi', icon: 'chevron-down' },
    { label: 'Age: 20-30', icon: 'chevron-down' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Nearby People</Text>
          <View style={styles.locationRow}>
            <Icon name="map-pin" size={14} color={COLORS.gray} />
            <Text style={styles.locationText}>Wynwood Art District, Miami</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.filterIcon} onPress={() => navigation.navigate('Filters')}>
          <Icon name="sliders" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {filterOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.filterChip}>
              <Text style={styles.filterChipText}>{option.label}</Text>
              <Icon name={option.icon} size={14} color={COLORS.gray} style={styles.chipIcon} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={DUMMY_USERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard 
            user={item} 
            onDetail={() => navigation.navigate('UserDetail', { user: item })}
            onConnect={() => console.log('Connect', item.id)}
            onSkip={() => console.log('Skip', item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
