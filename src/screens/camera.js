import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import {Modalize} from 'react-native-modalize';
import {images} from '../assets';
import {useNavigation} from '@react-navigation/core';
import {RNCamera} from 'react-native-camera';
import {SoundsData, textConstant} from '../utils/constants';
import LoadingView from './LoadingView';
const CameraScreen = () => {
  const modalizeRef = useRef();
  const cameraRef = useRef();
  const {navigate} = useNavigation();
  const [takingPic, setTakingPic] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [rotateCamera, setRotateCamera] = useState(true);
  const [flashType, setFlashType] = useState('on');
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const playSound = (v, type) => {
    try {
      SoundPlayer.playSoundFile(v, type);
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };

  useEffect(() => {
    let _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingFile',
      async ({success, name, type}) => {
        console.log('finished loading file', success, name, type);
        const info = await SoundPlayer.getInfo();
        console.log(info, 'FinishedLoadingFile');
        setPlaying(name);
        SoundPlayer.play();
      },
    );
    let _onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      'FinishedLoading',
      ({success}) => {
        console.log('finished loading', success);
      },
    );
    let _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        console.log('finished playing', success);
        setPlaying('');
      },
    );
    let _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      async ({success, url}) => {
        console.log('finished loading url', success, url);
        const info = await SoundPlayer.getInfo();
        console.log(info, 'FinishedLoadingURL');
        // this.setState(...)
        SoundPlayer.play();
      },
    );
    return () => {
      _onFinishedLoadingURLSubscription.remove();
      _onFinishedLoadingFileSubscription.remove();
      _onFinishedLoadingSubscription.remove();
      _onFinishedPlayingSubscription.remove();
    };
  }, []);

  const getData = () => {
    return SoundsData;
  };
  const _renderItem = ({item}) => {
    return (
      <>
        {playing === item.fileName ? (
          <>
            <TouchableOpacity
              style={styles.mainContent}
              onPress={() => stopPlaying()}>
              <Image source={images.stop_icon} style={styles.playPauseIcon} />
              <Text style={styles.textColor}>{item.name}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.mainContent}
              onPress={() => {
                playSound(item.fileName, item.type);
              }}>
              <Image source={images.play_icon} style={styles.playPauseIcon} />
              <Text style={styles.textColor}>{item.name}</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  };
  const _renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText} />
        <Text style={styles.headerText}>{textConstant.Sounds}</Text>
        <TouchableOpacity onPress={() => onClose()}>
          <Image source={images.close_icon} style={styles.closeImage} />
        </TouchableOpacity>
      </View>
    );
  };
  const stopPlaying = () => {
    SoundPlayer.stop();
    setPlaying('');
  };

  const takePicture = async () => {
    if (cameraRef.current && !takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      setTakingPic(true);

      try {
        const data = await cameraRef.current?.takePictureAsync(options);
        stopPlaying();
        navigate('PhotoView', {
          image: data,
        });
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        setTakingPic(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      {takingPic && <LoadingView />}
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        style={styles.camera}
        type={
          rotateCamera
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        }
        flashMode={flashType}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.flashcontainer}
          onPress={() => {
            if (flashType === 'on') {
              setFlashType('off');
            } else if (flashType === 'off') {
              setFlashType('auto');
            } else {
              setFlashType('on');
            }
          }}>
          <Image source={images.flash_icon} style={styles.rotate_icon} />
          <Text style={styles.flashtext}>{flashType}</Text>
        </TouchableOpacity>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setRotateCamera(!rotateCamera)}>
            <Image source={images.rotate_camera} style={styles.rotate_icon} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={takePicture}>
            <Image
              source={images.apple_camera_icon}
              style={styles.camera_icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onOpen()}
            style={styles.margin}>
            <Image source={images.list_icon} style={styles.image} />
          </TouchableOpacity>
        </View>
      </RNCamera>

      <Modalize
        useNativeDriver
        ref={modalizeRef}
        modalHeight={500}
        modalStyle={styles.modal}
        overlayStyle={styles.overlay}
        flatListProps={{
          data: getData(),
          renderItem: _renderItem,
          keyExtractor: item => item.id,
          showsVerticalScrollIndicator: false,
          ListHeaderComponent: _renderHeader,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'rgba(0,0,0,.2)',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: 40,
    width: 40,
  },
  header: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  mainContent: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  camera_icon: {
    height: 45,
    width: 45,
  },
  rotate_icon: {
    height: 45,
    width: 45,
  },
  modal: {
    backgroundColor: '#fff',
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  camera: {
    flexGrow: 1,
  },
  playPauseIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  textColor: {
    color: '#000',
    fontSize: 14,
  },
  closeImage: {
    height: 20,
    width: 20,
  },
  flashcontainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    alignItems: 'center',
  },
  flashtext: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  margin: {marginTop: 5},
});

export default CameraScreen;
