import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {images} from '../assets';
import {textConstant, savePhoto, colorConstant} from '../utils/constants';
const PhotoView = () => {
  const {params} = useRoute();
  const {goBack} = useNavigation();
  const {image} = params;
  console.log(image);
  const sourceURL = image.uri;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image source={images.back_icon} style={styles.back_icon} />
        </TouchableOpacity>
        <Text style={styles.textColor}>{textConstant.Preview}</Text>
        <TouchableOpacity onPress={() => savePhoto(sourceURL)}>
          <Image source={images.download_icon} style={styles.download_icon} />
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: sourceURL}}
        style={styles.imageStyle}
        resizeMode="contain"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back_icon: {height: 20, width: 20},
  bottom_view: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: colorConstant.primary,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  saveImage: {
    alignItems: 'center',
  },
  download_icon: {
    height: 20,
    width: 20,
  },
  textColor: {
    color: '#000',
    fontSize: 14,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  emptytext: {width: 20},
  imageStyle: {flex: 1},
});
export default PhotoView;
