import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Heading,
  Box,
  Text,
  HStack,
  VStack,
  ScrollView,
} from '@gluestack-ui/themed';
import { useIsFocused } from '@react-navigation/native';

function Laporan({ navigation, route }: any) {
  const isFocused = useIsFocused();

  return (
    <Fragment>
      {isFocused ? (
        <StatusBar animated={true} backgroundColor="#6474ff" />
      ) : null}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerPage}>
          <VStack marginBottom={20}>
            <HStack>
              <Box
                $active-bg="#dadade"
                flex={1}
                backgroundColor="#fff"
                marginHorizontal={20}
                marginTop={16}
                padding={20}
                borderRadius={12}
                height={'100%'}
              >
                <Heading
                  marginVertical={0}
                  fontSize={18}
                  lineHeight={20}>
                  Judul
                </Heading>
                <Text marginTop={4} color="black">
                  Deskripsi
                </Text>
              </Box>
            </HStack>
          </VStack>
        </View>
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPage: {
    backgroundColor: '#6474ff',
    flex: 1,
    width: '100%',
  },
});

export default Laporan;
