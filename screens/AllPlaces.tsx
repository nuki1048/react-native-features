import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PlacesList from '../components/places/PlacesList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useIsFocused } from '@react-navigation/native';
import { Place } from '../models/place';
import { fetchPlaces } from '../utils/database';

const AllPlaces: React.FC<
  NativeStackScreenProps<RootStackParamList, 'AllPlaces'>
> = () => {
  const isFocused = useIsFocused();
  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    const loadPlaces = async () => {
      const result = await fetchPlaces();
      setPlaces(result);
    };
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);
  return <PlacesList places={places} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
