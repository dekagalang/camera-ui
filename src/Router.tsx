import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Home from '../Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function Router(): React.ReactElement | null {
  // const [cameraPermission, setCameraPermission] =
  //   useState<CameraPermissionStatus>();
  // const [microphonePermission, setMicrophonePermission] =
  //   useState<CameraPermissionStatus>();

  // useEffect(() => {
  //   Camera.getCameraPermissionStatus().then(setCameraPermission);
  //   Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  // }, []);

  // const showPermissionsPage =
  //   cameraPermission !== 'authorized' ||
  //   microphonePermission === 'not-determined';
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'dark',
          animationTypeForReplace: 'push',
        }}
        // initialRouteName={
        //   showPermissionsPage ? 'PermissionsPage' : 'CameraPage'
        // }>
        initialRouteName={'Home'}>
        {/* <Stack.Screen name="PermissionsPage" component={PermissionsPage} /> */}
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
