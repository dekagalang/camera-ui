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
import React from 'react';
import {StatusBar, StyleSheet, View, SafeAreaView} from 'react-native';

function Register({navigation}: any) {
  const isFocused = useIsFocused();
  return (
    <SafeAreaView>
      {isFocused ? <StatusBar animated={true} backgroundColor="#6474ff" /> : null}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerLogin}>
          <VStack margin={20}>
            <Heading
              marginVertical={0}
              fontSize={20}
              lineHeight={20}
              color="#fff">
              Register Now
            </Heading>
            <FormControl marginBottom={20} marginTop={30}>
              <FormControlLabel>
                <FormControlLabelText color="#fff">Name</FormControlLabelText>
              </FormControlLabel>
              <Input variant="underlined">
                <InputField color="#fff" />
              </Input>
            </FormControl>
            <FormControl marginBottom={20}>
              <FormControlLabel>
                <FormControlLabelText color="#fff">Email</FormControlLabelText>
              </FormControlLabel>
              <Input variant="underlined">
                <InputField color="#fff" />
              </Input>
            </FormControl>
            <FormControl marginBottom={20}>
              <FormControlLabel>
                <FormControlLabelText color="#fff">
                  Password
                </FormControlLabelText>
              </FormControlLabel>
              <Input variant="underlined">
                <InputField color="#fff" type="password" />
              </Input>
            </FormControl>
            <Button
              $active-bg="#dadade"
              backgroundColor="black"
              borderRadius={100}
              marginTop={20}
              alignItems="center"
              onPress={() => navigation.pop()}>
              <ButtonText color="#fff">Register</ButtonText>
            </Button>
            <Button
              $active-bg="#dadade"
              variant="outline"
              borderColor="transparent"
              borderRadius={100}
              marginTop={20}
              alignItems="center"
              onPress={() => navigation.pop()}>
              <ButtonText color="#fff">Back To Login</ButtonText>
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

export default Register;
