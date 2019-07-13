import { Platform } from 'react-native';

export const getBaseUrl = () => {
  return `http://${Platform.OS === 'ios' ? 'localhost' : '10.0.2.2' }:3000`
};


