import { Image, StyleSheet, Text, View } from 'react-native';
import {
  launchCameraAsync,
  MediaTypeOptions,
  useCameraPermissions,
} from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../style/colors';
import OutlineButton from '../ui/OutlineButton';
import { requestThePersmissions } from '../../utils/utils';

const ImagePicker: React.FC<{
  onImageTaken: (image: string) => void;
}> = ({ onImageTaken }) => {
  const [image, setImage] = useState<string | null>(null);
  const [status, requestPermission] = useCameraPermissions();

  const pickImage = async () => {
    const permissions = await requestThePersmissions(
      status?.status,
      requestPermission,
      'You need to grant camera permissions to use this app.'
    );

    if (!permissions) return;
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      const image = result.assets[0].uri;
      setImage(image);
      onImageTaken(image);
    }
  };

  return (
    <View>
      <View style={styles.imagePreview}>
        {!image && <Text>No image taken yet.</Text>}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <OutlineButton icon='camera' onPress={pickImage}>
        Take image
      </OutlineButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
