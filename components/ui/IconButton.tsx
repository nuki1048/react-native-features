import {
  Animated,
  OpaqueColorValue,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface Props extends PressableProps {
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
}

const IconButton: React.FC<Props> = ({
  icon,
  color = 'white',
  size,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: { opacity: 0.5 },
});
