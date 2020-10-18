import React, {PropsWithChildren} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';

import theme from 'theme';
export default function Button({
  children,
  type,
  onPress,
  style,
  disabled,
}: PropsWithChildren<{
  type?: 'primary' | 'alt';
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: Boolean;
}>) {
  const styles = buttonTypes[type || 'primary'];
  if (disabled) {
    return (
      <View style={[styles.button, style, {opacity: 0.25}]}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const primaryStyles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',

    fontSize: 16,
  },
});

const altStyles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme.colors.text,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.text,
  },
});

const buttonTypes = {
  primary: primaryStyles,
  alt: altStyles,
};
