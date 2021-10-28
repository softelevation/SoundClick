import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colorConstant} from '../utils/constants';

export default class LoadingView extends Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <ActivityIndicator size={'large'} color={colorConstant.secondary} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1000,
  },
  container: {
    borderRadius: 10,
    shadowColor: 'black',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    shadowOffset: {width: 0, height: 2},
    maxWidth: 150,
    maxHeight: 150,
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
});
