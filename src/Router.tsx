import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Home from './pages/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Laporan from './pages/Laporan';

const Stack = createNativeStackNavigator();

export default function Router(): React.ReactElement | null {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'auto',
          animationTypeForReplace: 'push',
        }}
        // initialRouteName={
        //   showPermissionsPage ? 'PermissionsPage' : 'CameraPage'
        // }>
        initialRouteName={'Home'}>
        {/* <Stack.Screen name="PermissionsPage" component={PermissionsPage} /> */}
        <Stack.Screen name="Laporan" component={Laporan} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
