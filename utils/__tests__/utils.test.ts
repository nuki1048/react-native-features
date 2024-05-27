import { PermissionStatus } from 'expo-image-picker';
import { requestThePersmissions } from '../utils';
import { Alert } from 'react-native';
describe('requestThePersmissions', () => {
  it('should return false if status is undefined', async () => {
    const status = undefined;
    const requestPermission = jest.fn();
    const alertText = 'Permission denied';

    const result = await requestThePersmissions(
      status,
      requestPermission,
      alertText
    );

    expect(result).toBe(false);
    expect(requestPermission).not.toHaveBeenCalled();
  });

  it('should call requestPermission and return granted value if status is UNDETERMINED', async () => {
    const status = PermissionStatus.UNDETERMINED;
    const requestPermission = jest.fn().mockResolvedValue({ granted: true });
    const alertText = 'Permission denied';

    const result = await requestThePersmissions(
      status,
      requestPermission,
      alertText
    );

    expect(result).toBe(true);
    expect(requestPermission).toHaveBeenCalled();
  });

  it('should show an alert and return false if status is DENIED', async () => {
    const status = PermissionStatus.DENIED;
    const requestPermission = jest.fn();
    const alertText = 'Permission denied';
    const mockAlert = jest.spyOn(Alert, 'alert');

    const result = await requestThePersmissions(
      status,
      requestPermission,
      alertText
    );

    expect(result).toBe(false);
    expect(mockAlert).toHaveBeenCalledWith(
      'Incufficient Permissions!',
      alertText
    );
  });

  it('should return true if status is neither UNDETERMINED nor DENIED', async () => {
    const status = PermissionStatus.GRANTED;
    const requestPermission = jest.fn();
    const alertText = 'Permission denied';

    const result = await requestThePersmissions(
      status,
      requestPermission,
      alertText
    );

    expect(result).toBe(true);
    expect(requestPermission).not.toHaveBeenCalled();
  });
});
