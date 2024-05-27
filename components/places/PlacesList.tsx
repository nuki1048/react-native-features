import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Place } from '../../models/place';
import PlaceItem from './PlaceItem';
import { Colors } from '../../style/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const PlacesList: React.FC<{ places: Place[] }> = ({ places }) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'AddPlace'>>();
  if (!places || places.length === 0)
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet</Text>
      </View>
    );
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          {...item}
          onPress={() => navigation.navigate('PlaceDetails', { id: item.id })}
        />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
