import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Alert, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
} from '../utils/commonUtils';

const UploadFile = ({
  children,
  file: selectedfile,
  onUploadComplete,
  onProgressChange,
}) => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progress, setProgress] = useState(-1);
  const navigation = useNavigation();

  useEffect(() => {
    if (strictValidObjectWithKeys(selectedfile)) {
      setFiles(prevState => [selectedfile]);
    }
  }, [selectedfile]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      setUploadedFiles([]);
    });

    return unsubscribe;
  }, [navigation]);

  const upload = async (index = 0) => {
    console.log(files, 'files');
    if (strictValidArrayWithLength(files)) {
      const file = files[index];
      const {uri} = file;
    }
  };

  useEffect(() => {
    upload();
  }, [files]);

  return <View>{children}</View>;
};

UploadFile.propTypes = {
  children: PropTypes.shape(PropTypes.object).isRequired,
  file: PropTypes.shape(PropTypes.object).isRequired,
  onUploadComplete: PropTypes.func.isRequired,
  onProgressChange: PropTypes.func.isRequired,
};

export default UploadFile;
