import CameraRoll from '@react-native-community/cameraroll';
import {Alert} from 'react-native';

export const colorConstant = {
  primary: '#D8ECF9',
  secondary: '#5DE3F9',
};
export const textConstant = {
  Preview: 'Preview',
  SavePhoto: 'Save',
  Sounds: 'Default Sounds',
};
const type = 'photo';
const album = 'SoundClick';

export const savePhoto = sourceURL => {
  CameraRoll.save(sourceURL, {type, album})
    .then(Alert.alert('Done', 'Photo added to camera roll!'))
    .catch(err => console.log('err:', err));
};
export const SoundsData = [
  {
    id: 0,
    name: 'Dog Sound',
    fileName: 'dog',
    duration: '21',
    type: 'mp3',
    isUrl: false,
  },
  {
    id: 1,
    name: 'Cat Sound',
    fileName: 'cat',
    duration: '2',
    type: 'mp3',
    isUrl: false,
  },
  {
    id: 2,
    name: 'Bird Sound',
    fileName: 'bird',
    duration: '15',
    type: 'mp3',
    isUrl: false,
  },
  {
    id: 3,
    name: 'Baby Toy',
    fileName: 'babytoy',
    duration: '16',
    type: 'wav',
    isUrl: false,
  },
  {
    id: 4,
    name: 'Baby Laughing',
    fileName: 'babylaughing',
    duration: '13',
    type: 'mp3',
    isUrl: false,
  },
];
