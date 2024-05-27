import { PermissionStatus } from 'expo-image-picker';
import { Alert } from 'react-native';

export async function requestThePersmissions<T>(
  status: PermissionStatus | undefined,
  requestPermission: () => Promise<T>,
  alertText: string
) {
  if (!status) return false;
  if (status === PermissionStatus.UNDETERMINED) {
    const response = await requestPermission();
    return (response as { granted: boolean }).granted;
  }

  if (status === PermissionStatus.DENIED) {
    Alert.alert('Incufficient Permissions!', alertText);
    return false;
  }

  return true;
}
