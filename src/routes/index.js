// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraScreen from '../screens/camera';
import PhotoView from '../screens/photo-view';
const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CameraScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="PhotoView" component={PhotoView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
