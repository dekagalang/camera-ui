import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Laporan from './pages/Laporan';
import Register from './pages/Register';
import Login from './pages/Login';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { LogBox } from 'react-native';
import { _retrieveData } from './services/asyncStorage';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Router(): React.ReactElement | null {
  const [loggedInUser, setLoggedInUser] = useState<any | null>(null);

  useEffect(() => {
    const storeData = async () => {
      setLoggedInUser(await _retrieveData('session'));
    };
    storeData();
  }, [])

  return (
    <GluestackUIProvider config={config}>
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
        // initialRouteName={'Login'}
        >
          {
            loggedInUser != null ? (
              <>
                <Stack.Screen name="Home" component={Home} initialParams={{ loggedInUser }} />
                <Stack.Screen name="Laporan" component={Laporan} initialParams={{ loggedInUser }} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} initialParams={{ setLoggedInUser }} />
                <Stack.Screen name="Register" component={Register} />
              </>
            )
          }
          {/* <Stack.Screen name="PermissionsPage" component={PermissionsPage} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
