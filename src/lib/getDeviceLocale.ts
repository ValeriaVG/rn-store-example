import {NativeModules, Platform} from 'react-native';
export default function getDeviceLocale() {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;
  return deviceLanguage.split('_').shift().toLowerCase();
}
