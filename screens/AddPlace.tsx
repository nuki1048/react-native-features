import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlaceForm from '../components/places/PlaceForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { insertPlace } from '../utils/database';

const AddPlace: React.FC<
  NativeStackScreenProps<RootStackParamList, 'AddPlace'>
> = ({ navigation }) => {
  const handleCreatePlace = async (place: any) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  };
  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};

export default AddPlace;
