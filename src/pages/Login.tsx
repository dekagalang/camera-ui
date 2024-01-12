import { Button, ButtonText, FormControl, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, HStack, Heading, Input, InputField, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

function Login({navigation}: any) {
  return <Fragment>
    <StatusBar animated={true} backgroundColor="#6474ff" />
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerLogin}>
        <VStack margin={20}>
          <Heading marginVertical={0} fontSize={20} lineHeight={20} color="#fff">
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
          <FormControl marginBottom={20}>
            <FormControlLabel>
              <FormControlLabelText color="#fff">Email</FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined">
              <InputField color="#fff" />
            </Input>
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText color="#fff">Password</FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined">
              <InputField color="#fff" type="password" />
            </Input>
          </FormControl>
          <Button
            $active-bg="#dadade"
            paddingVertical={10}
            backgroundColor="black"
            borderRadius={100}
            marginTop={20}
            alignItems="center"
            onPress={() => navigation.navigate('Home')}>
            <ButtonText color="#fff">Login</ButtonText>
          </Button>
        </VStack>
      </View>
    </ScrollView>
  </Fragment>
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
})

export default Login;