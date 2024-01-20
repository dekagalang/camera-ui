/* eslint-disable @typescript-eslint/no-shadow */
import {
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
  ScrollView,
  VStack,
} from '@gluestack-ui/themed';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { account, ID } from '../lib/appwrite';
import { _clearAllData, _retrieveData, _storeData } from '../services/asyncStorage';

function Login({ navigation, route }: any) {
  // const [loggedInUser, setLoggedInUser] = useState({ name: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [name, setName] = useState('');
  const isFocused = useIsFocused();
  const { setLoggedInUser } = route.params;

  async function login(email: string, password: string) {
    await account.createEmailSession(email, password);
    const dataLogin = await account.get();
    await _storeData('session', JSON.stringify(dataLogin));
    setLoggedInUser(dataLogin);
  }

  useEffect(() => {
    const runLocalStorage = async () => {
      // console.log(await _retrieveData('session'));
      // await _clearAllData()
    };
    runLocalStorage();
  }, []);

  return (
    <SafeAreaView>
      {isFocused ? (
        <StatusBar animated={true} backgroundColor="#6474ff" />
      ) : null}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerLogin}>
          <VStack margin={20}>
            <Heading
              marginVertical={0}
              fontSize={20}
              lineHeight={20}
              color="#fff">
              Welcome Back!
            </Heading>
            <Heading
              marginVertical={10}
              marginHorizontal={0}
              fontSize={16}
              fontWeight="400"
              lineHeight={20}
              color="#fff">
              Please login to your account.
            </Heading>
            <FormControl marginBottom={20} marginTop={30}>
              <FormControlLabel>
                <FormControlLabelText color="#fff">Email</FormControlLabelText>
              </FormControlLabel>
              <Input variant="underlined">
                <InputField
                  color="#fff"
                  placeholderTextColor="#fff"
                  onChange={e => setEmail(e.nativeEvent.text)}
                />
              </Input>
            </FormControl>
            <FormControl marginBottom={20}>
              <FormControlLabel>
                <FormControlLabelText color="#fff">
                  Password
                </FormControlLabelText>
              </FormControlLabel>
              <Input variant="underlined">
                <InputField
                  color="#fff"
                  type="password"
                  placeholderTextColor="#fff"
                  onChange={e => setPassword(e.nativeEvent.text)}
                />
              </Input>
            </FormControl>
            <Button
              $active-bg="#dadade"
              backgroundColor="black"
              borderRadius={100}
              marginTop={20}
              alignItems="center"
              onPress={() => login(email, password)}>
              {/* onPress={() => navigation.navigate('Home')}> */}
              <ButtonText color="#fff">Login</ButtonText>
            </Button>
            <Button
              $active-bg="#dadade"
              variant="outline"
              borderColor="transparent"
              borderRadius={100}
              marginTop={20}
              alignItems="center"
              // onPress={() => login(email, password)}>
              // onPress={async () => {
              //   await account.create(ID.unique(), email, password, name);
              //   login(email, password);
              // }}>
              onPress={() => navigation.navigate('Register')}>
              <ButtonText color="#fff">Register</ButtonText>
            </Button>
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
  containerLogin: {
    backgroundColor: '#6474ff',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
});

export default Login;
