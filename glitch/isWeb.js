import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
console.log('Platform:', Platform.OS);
console.log('isWeb:', isWeb);

export default isWeb;
